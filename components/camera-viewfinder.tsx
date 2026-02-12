"use client";

export function CameraViewfinder() {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-[10000]"
      aria-hidden="true"
    >
      {/* Top-left L */}
      <div className="viewfinder-corner absolute top-1.5 left-2 md:top-1.5 md:left-2 w-10 h-10 md:w-12 md:h-12 border-l-[3px] border-t-[3px]" />
      {/* Top-right L */}
      <div className="viewfinder-corner absolute top-1.5 right-2 md:top-1.5 md:right-2 w-10 h-10 md:w-12 md:h-12 border-r-[3px] border-t-[3px]" />
      {/* Bottom-left L */}
      <div className="viewfinder-corner absolute bottom-1.5 left-2 md:bottom-1.5 md:left-2 w-10 h-10 md:w-12 md:h-12 border-l-[3px] border-b-[3px]" />
      {/* Bottom-right L */}
      <div className="viewfinder-corner absolute bottom-1.5 right-2 md:bottom-1.5 md:right-2 w-10 h-10 md:w-12 md:h-12 border-r-[3px] border-b-[3px]" />
    </div>
  );
}
