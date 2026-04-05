Featured work pipeline — source files
=====================================

Place the five client source videos here with these exact names (see scripts/featured-sources.json):

  IMG_3716.MOV  → relocation
  IMG_4101.MOV  → city-frequency
  IMG_5165.MOV  → red-room-session
  IMG_6453.MOV  → after-hours
  IMG_7361.MOV  → built-daily

Then from the project root run:

  npm run process:featured

Or:

  MEDIA_SOURCES_DIR="C:/path/to/folder" npm run process:featured

Outputs:

  public/assets/featured/<slug>/preview.mp4  (H.264 + AAC when source has audio)

poster.jpg is NOT overwritten unless GENERATE_POSTER_FROM_VIDEO=1.
Copy manual stills (poster + gallery-0N.jpg) into each slug folder as needed.
