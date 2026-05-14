import React, { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Volume, VolumeX } from 'lucide-react';

const CROSSFADE_MS = 600;

export default function VideoPlayer({ sectionId }) {
  const [files, setFiles] = useState([]);
  const [index, setIndex] = useState(0);
  const [muted, setMuted] = useState(true);
  const [activeSlot, setActiveSlot] = useState(0);

  const videoARef = useRef(null);
  const videoBRef = useRef(null);
  const playerRootRef = useRef(null);
  const frameRef = useRef(null);

  const mountedRef = useRef(true);
  const pollRef = useRef(null);
  const transitionRef = useRef(null);
  const roRef = useRef(null);
  const lastIndexRef = useRef(-1);

  useEffect(() => {
    mountedRef.current = true;
    const fetchFiles = async () => {
      try {
        let res = await fetch(`/__video_list/${sectionId}`);
        let list = [];
        if (res.ok) list = await res.json();
        else {
          res = await fetch(`/video/${sectionId}/manifest.json`);
          if (res.ok) list = await res.json();
        }
        if (!Array.isArray(list)) list = [];
        list = list.filter((f) => f && !f.startsWith('.'));
        if (mountedRef.current) {
          setFiles(list);
          if (list.length && lastIndexRef.current === -1) {
            setIndex(0);
            lastIndexRef.current = 0;
          } else {
            setIndex((prev) => (list.length ? Math.min(prev, list.length - 1) : 0));
          }
        }
      } catch (err) {
        if (mountedRef.current) setFiles([]);
      }
    };

    fetchFiles();
    pollRef.current = setInterval(fetchFiles, 5000);
    return () => {
      mountedRef.current = false;
      clearInterval(pollRef.current);
      if (transitionRef.current) clearTimeout(transitionRef.current);
    };
  }, [sectionId]);

  const getVideoRef = (slot) => (slot === 0 ? videoARef.current : videoBRef.current);

  const waitForLoaded = (video, timeout = 2000) =>
    new Promise((resolve) => {
      try {
        if (video && video.readyState >= 2) return resolve(true);
      } catch (e) {
        return resolve(false);
      }
      let done = false;
      const onLoaded = () => {
        if (done) return;
        done = true;
        video.removeEventListener('loadeddata', onLoaded);
        video.removeEventListener('error', onError);
        resolve(true);
      };
      const onError = () => {
        if (done) return;
        done = true;
        video.removeEventListener('loadeddata', onLoaded);
        video.removeEventListener('error', onError);
        resolve(false);
      };
      const timer = setTimeout(() => {
        if (done) return;
        done = true;
        video.removeEventListener('loadeddata', onLoaded);
        video.removeEventListener('error', onError);
        resolve(false);
      }, timeout);
      video.addEventListener('loadeddata', onLoaded);
      video.addEventListener('error', onError);
    });

  const adjustFrameToAspect = (aspectNumeric) => {
    const root = playerRootRef.current;
    const frame = frameRef.current;
    if (!root || !frame || !aspectNumeric) return;
    const card = root.closest('.visual-scene-card') || root.parentElement;
    if (!card) return;
    const cardRect = card.getBoundingClientRect();
    const inset = 36; // padding/inset to avoid touching edges
    const availableWidth = Math.max(0, cardRect.width - inset);
    const availableHeight = Math.max(0, cardRect.height - inset);
    const containerAspect = availableWidth / availableHeight;
    let width;
    let height;
    if (containerAspect > aspectNumeric) {
      // constrained by height
      height = availableHeight;
      width = height * aspectNumeric;
    } else {
      width = availableWidth;
      height = width / aspectNumeric;
    }
    frame.style.width = `${Math.round(width)}px`;
    frame.style.height = `${Math.round(height)}px`;
    frame.style.left = '50%';
    frame.style.top = '50%';
    frame.style.transform = 'translate(-50%, -50%)';
  };

  // observe container resize and recompute frame
  useEffect(() => {
    const root = playerRootRef.current;
    if (!root) return;
    const card = root.closest('.visual-scene-card') || root.parentElement;
    if (!card) return;
    if ('ResizeObserver' in window) {
      roRef.current = new ResizeObserver(() => {
        const curSlot = activeSlot;
        const curVideo = getVideoRef(curSlot);
        const aspectNumeric = curVideo && curVideo.videoWidth && curVideo.videoHeight ? curVideo.videoWidth / curVideo.videoHeight : null;
        if (aspectNumeric) adjustFrameToAspect(aspectNumeric);
      });
      roRef.current.observe(card);
      return () => roRef.current && roRef.current.disconnect();
    }
    const onResize = () => {
      const curSlot = activeSlot;
      const curVideo = getVideoRef(curSlot);
      const aspectNumeric = curVideo && curVideo.videoWidth && curVideo.videoHeight ? curVideo.videoWidth / curVideo.videoHeight : null;
      if (aspectNumeric) adjustFrameToAspect(aspectNumeric);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [activeSlot]);

  useEffect(() => {
    if (!files.length) return;
    if (!videoARef.current || !videoBRef.current) return;

    const src = `/video/${sectionId}/${encodeURIComponent(files[index])}`;
    const curSlot = activeSlot;
    const nextSlot = 1 - curSlot;
    const curVideo = getVideoRef(curSlot);
    const nextVideo = getVideoRef(nextSlot);

    (async () => {
      // Initial load into current slot if empty
      if (!curVideo.dataset.loaded) {
        try {
          curVideo.style.transition = `opacity ${CROSSFADE_MS}ms ease`;
          curVideo.style.opacity = 0;
          curVideo.setAttribute('aria-hidden', 'true');
          curVideo.src = src;
          curVideo.dataset.loaded = '1';
          curVideo.muted = muted;
          curVideo.volume = muted ? 0 : 1;
          curVideo.load();
          const ok = await waitForLoaded(curVideo, 2000);
          if (ok) await curVideo.play().catch(() => {});
          curVideo.style.opacity = 1;
          curVideo.setAttribute('aria-hidden', 'false');

          // adjust frame to this video's aspect
          const vw = curVideo.videoWidth || curVideo.clientWidth || 16;
          const vh = curVideo.videoHeight || curVideo.clientHeight || 9;
          if (vw && vh) adjustFrameToAspect(vw / vh);
        } catch (e) {
          try {
            curVideo.style.opacity = 1;
            curVideo.setAttribute('aria-hidden', 'false');
          } catch (e) {}
        }
        lastIndexRef.current = index;
        return;
      }

      // If same index as last, do nothing
      if (lastIndexRef.current === index) return;

      // Prepare next slot
      try {
        nextVideo.style.transition = `opacity ${CROSSFADE_MS}ms ease`;
        curVideo.style.transition = `opacity ${CROSSFADE_MS}ms ease`;
        nextVideo.style.opacity = 0;
        nextVideo.setAttribute('aria-hidden', 'true');
        nextVideo.style.zIndex = 3;
        curVideo.style.zIndex = 2;
        nextVideo.src = src;
        nextVideo.dataset.loaded = '1';
        nextVideo.muted = muted;
        nextVideo.volume = 0;
        nextVideo.currentTime = 0;
        nextVideo.load();

        // wait for first frame to be available before showing to avoid black frames
        const ready = await waitForLoaded(nextVideo, 2500);
        if (ready) {
          const vw = nextVideo.videoWidth || nextVideo.clientWidth || null;
          const vh = nextVideo.videoHeight || nextVideo.clientHeight || null;
          if (vw && vh) adjustFrameToAspect(vw / vh);
          await nextVideo.play().catch(() => {});
        } else {
          // attempt play anyway
          nextVideo.play().catch(() => {});
        }

        // now crossfade visually (audio crossfade handled separately)
        requestAnimationFrame(() => {
          nextVideo.setAttribute('aria-hidden', 'false');
          nextVideo.style.opacity = 1;
          curVideo.style.opacity = 0;
          curVideo.setAttribute('aria-hidden', 'true');

          // audio crossfade when unmuted
          if (!muted) fadeVolumes(curVideo, nextVideo, CROSSFADE_MS);

          if (transitionRef.current) clearTimeout(transitionRef.current);
          transitionRef.current = setTimeout(() => {
            try {
              curVideo.pause();
              curVideo.removeAttribute('src');
              curVideo.load();
              delete curVideo.dataset.loaded;
            } catch (e) {}
            nextVideo.style.zIndex = '';
            curVideo.style.zIndex = '';
            setActiveSlot(nextSlot);
            lastIndexRef.current = index;
          }, CROSSFADE_MS + 50);
        });
      } catch (err) {
        // if anything fails, fallback to simple swap
        try {
          nextVideo.setAttribute('aria-hidden', 'false');
          nextVideo.style.opacity = 1;
          curVideo.style.opacity = 0;
          curVideo.setAttribute('aria-hidden', 'true');
          if (transitionRef.current) clearTimeout(transitionRef.current);
          transitionRef.current = setTimeout(() => {
            try {
              curVideo.pause();
              curVideo.removeAttribute('src');
              curVideo.load();
              delete curVideo.dataset.loaded;
            } catch (e) {}
            setActiveSlot(nextSlot);
            lastIndexRef.current = index;
          }, CROSSFADE_MS + 50);
        } catch (e) {}
      }
    })();
  }, [index, files, muted]);

  useEffect(() => {
    // when muting/unmuting, update volumes appropriately
    const cur = getVideoRef(activeSlot);
    const other = getVideoRef(1 - activeSlot);
    if (cur) {
      cur.muted = muted;
      cur.volume = muted ? 0 : 1;
    }
    if (other) {
      other.muted = muted;
      other.volume = muted ? 0 : 0;
    }
  }, [muted, activeSlot]);

  const fadeVolumes = (fromV, toV, duration) => {
    const start = performance.now();
    if (!fromV || !toV) return;
    fromV.volume = 1;
    toV.volume = 0;
    const step = () => {
      const t = Math.min(1, (performance.now() - start) / duration);
      fromV.volume = Math.max(0, 1 - t);
      toV.volume = Math.min(1, t);
      if (t < 1) requestAnimationFrame(step);
      else {
        fromV.volume = 0;
        toV.volume = 1;
      }
    };
    requestAnimationFrame(step);
  };

  const next = () => {
    if (!files.length) return;
    setIndex((p) => (p + 1) % files.length);
  };
  const prev = () => {
    if (!files.length) return;
    setIndex((p) => (p - 1 + files.length) % files.length);
  };
  const toggleMute = () => setMuted((m) => !m);

  const currentFile = files.length ? files[index] : null;

  return (
    <div className="video-player" data-section={sectionId} ref={playerRootRef}>
      {currentFile ? (
        <div className="video-wrapper">
          <div className="video-frame" ref={frameRef}>
            <div className="video-aspect">
              <video ref={videoARef} className="video-element" playsInline preload="auto" onEnded={next} aria-hidden="true" />
              <video ref={videoBRef} className="video-element" playsInline preload="auto" onEnded={next} aria-hidden="true" />
            </div>

            <button
              className="video-control video-prev"
              aria-label="Previous video"
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
            >
              <ChevronLeft size={28} />
            </button>

            <button
              className="video-control video-next"
              aria-label="Next video"
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
            >
              <ChevronRight size={28} />
            </button>

            <button
              className="video-mute"
              aria-label={muted ? 'Unmute' : 'Mute'}
              onClick={(e) => {
                e.stopPropagation();
                toggleMute();
              }}
            >
              {muted ? <VolumeX size={18} /> : <Volume size={18} />}
            </button>

            <div className="video-index">
              {index + 1}/{files.length}
            </div>
          </div>
        </div>
      ) : (
        <div className="video-placeholder">No videos found — drop files into <strong>/public/video/{sectionId}</strong></div>
      )}
    </div>
  );
}

          nextVideo.setAttribute('aria-hidden', 'false');
          nextVideo.style.opacity = 1;
          curVideo.style.opacity = 0;
          curVideo.setAttribute('aria-hidden', 'true');
          if (transitionRef.current) clearTimeout(transitionRef.current);
          transitionRef.current = setTimeout(() => {
            try {
              curVideo.pause();
              curVideo.removeAttribute('src');
              curVideo.load();
              delete curVideo.dataset.loaded;
            } catch (e) {}
            setActiveSlot(nextSlot);
            lastIndexRef.current = index;
          }, CROSSFADE_MS + 50);
        } catch (e) {}
      }
    })();
  }, [index, files, muted]);

  useEffect(() => {
    // when muting/unmuting, update volumes appropriately
    const cur = getVideoRef(activeSlot);
    const other = getVideoRef(1 - activeSlot);
    if (cur) {
      cur.muted = muted;
      cur.volume = muted ? 0 : 1;
    }
    if (other) {
      other.muted = muted;
      other.volume = muted ? 0 : 0;
    }
  }, [muted, activeSlot]);

  const fadeVolumes = (fromV, toV, duration) => {
    const start = performance.now();
    if (!fromV || !toV) return;
    fromV.volume = 1;
    toV.volume = 0;
    const step = () => {
      const t = Math.min(1, (performance.now() - start) / duration);
      fromV.volume = Math.max(0, 1 - t);
      toV.volume = Math.min(1, t);
      if (t < 1) requestAnimationFrame(step);
      else {
        fromV.volume = 0;
        toV.volume = 1;
      }
    };
    requestAnimationFrame(step);
  };

  const next = () => {
    if (!files.length) return;
    setIndex((p) => (p + 1) % files.length);
  };
  const prev = () => {
    if (!files.length) return;
    setIndex((p) => (p - 1 + files.length) % files.length);
  };
  const toggleMute = () => setMuted((m) => !m);

  const currentFile = files.length ? files[index] : null;

  return (
    <div className="video-player" data-section={sectionId}>
      {currentFile ? (
        <div className="video-wrapper">
          <div className="video-aspect">
            <video ref={videoARef} className="video-element" playsInline preload="auto" onEnded={next} aria-hidden="true" />
            <video ref={videoBRef} className="video-element" playsInline preload="auto" onEnded={next} aria-hidden="true" />
          </div>

          <button
            className="video-control video-prev"
            aria-label="Previous video"
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
          >
            <ChevronLeft size={28} />
          </button>

          <button
            className="video-control video-next"
            aria-label="Next video"
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
          >
            <ChevronRight size={28} />
          </button>

          <button
            className="video-mute"
            aria-label={muted ? 'Unmute' : 'Mute'}
            onClick={(e) => {
              e.stopPropagation();
              toggleMute();
            }}
          >
            {muted ? <VolumeX size={18} /> : <Volume size={18} />}
          </button>

          <div className="video-index">
            {index + 1}/{files.length}
          </div>
        </div>
      ) : (
        <div className="video-placeholder">No videos found — drop files into <strong>/public/video/{sectionId}</strong></div>
      )}
    </div>
  );
}
