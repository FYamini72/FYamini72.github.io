# Hero portrait options

Generated with the built-in `image_gen` tool using these two local reference photos for identity:

1. `C:\Users\MHM_IV_IIX_XIIX\Downloads\1789889304999.jpg` (the target adult is on the right)
2. `C:\Users\MHM_IV_IIX_XIIX\Downloads\1789889242824.jpg` (primary face reference)

Each prompt was a separate generation call. Final website-ready crops are 864×909 JPEGs.

## 1. `hero-01-studio-navy.jpg`

```text
Use case: identity-preserve
Asset type: first of three realistic hero portraits for the personal portfolio website of the adult man in both reference photos
Input images: image 1 shows the target adult on the RIGHT beside a baby; image 2 shows the same target adult alone and is the primary facial identity reference. Depict ONLY this adult man.
Primary request: transform the reference photos into a professional studio portrait while preserving the adult man's real facial identity as closely as possible: short thick black hair swept upward, dark eyebrows and brown eyes, distinctive moustache and compact chin beard/goatee, natural nose, face shape, skin tone and age. Do not beautify into a different person.
Scene/backdrop: seamless medium neutral gray studio background, softly graded, no props.
Wardrobe: tailored dark navy blazer over a simple light shirt, collar open, no tie.
Composition/framing: portrait near 1:1 vertical aspect ratio, head and upper torso from mid chest upward, centered with headroom and side margins suitable for crop to 864x909; direct calm gaze, slight natural smile.
Lighting/mood: balanced soft studio key and fill light, natural texture and professional but warm; enough contrast for both light and dark website themes.
Constraints: one adult man only; no baby, other people, hands, text, logos, watermark, badge, or artificial plastic skin.
```

## 2. `hero-02-office-black.jpg`

```text
Use case: identity-preserve
Asset type: second independent realistic hero portrait for a Persian software architect's portfolio
Input images: image 1 shows the target adult man on the RIGHT with a baby; image 2 shows the same man alone and is the primary reference for facial identity. Render only that adult man.
Primary request: preserve the actual adult man's face with short thick swept black hair, dark brows, brown eyes, characteristic dark moustache and small chin beard/goatee, natural nose, face shape, skin texture, skin tone and age. Keep unmistakable resemblance to the references, not a generic model.
Scene/backdrop: modern software office environment out of focus, restrained gray and blue tones, soft dark shelving and subtle desk forms, no visible screens or writing.
Wardrobe: plain black crew-neck top without logo or jacket.
Composition/framing: near-square vertical portrait, centered head and upper torso to mid chest, slightly wider camera distance than a headshot so shoulders and chest remain visible, comfortable headroom and side margins for 864x909 crop, direct relaxed gaze and subtle smile.
Lighting/mood: soft natural window light with balanced fill, neutral contrast and realistic editorial photography that works in dark and light themes.
Constraints: one adult man only; remove baby and all other people; no text, logo, watermark, artificial skin, hand gestures, or strong bright areas.
```

## 3. `hero-03-light-charcoal.jpg`

```text
Use case: identity-preserve
Asset type: third independent realistic hero portrait for the same man's personal software portfolio
Input images: image 1 shows the target adult man on the RIGHT of a baby; image 2 shows that same adult alone and is the primary identity reference. Show ONLY this adult man.
Primary request: create a polished but natural portrait of the same real adult, preserving short thick swept black hair, distinctive dark moustache and compact chin beard/goatee, dark eyebrows, brown eyes, true face shape, nose, skin tone and age. Avoid changing his identity or making him look like a generic model.
Scene/backdrop: light neutral warm gray studio or softly blurred modern interior background, uncluttered, with no stark white or overexposed areas.
Wardrobe: dark charcoal jacket over a plain muted light blue or white collared shirt, open collar, no tie.
Composition/framing: near-square vertical image, head and upper torso to mid chest, centered with comfortable headroom and side margins for crop to 864x909, direct gaze, genuine slight smile.
Lighting/mood: clean soft daylight, balanced shadow and highlight, subtle editorial texture; the face should remain readable against both dark and light website themes.
Constraints: one adult man only, no baby, no other people, no hands, no text, logos, watermark, excessive retouching or harsh background.
```

## Mobile outpaint. `hero-01-studio-navy-mobile-3x2.jpg`

Generated with the built-in `image_gen` tool using `hero-01-studio-navy.jpg` as the edit target, then composited with the original portrait to preserve its face and central clothing details. Only the newly generated outer area and soft edge transitions are used around the original.

```text
Use case: identity-preserve outpainting / precise-object-edit
Asset type: landscape mobile hero portrait derived from the supplied studio portrait
Input image: the sole image is the EDIT TARGET. Preserve the original adult man's exact face, short black hair, moustache, chin beard, navy blazer, pale shirt, headroom, pose, lighting and every existing visible body detail as closely as possible.
Primary request: expand the canvas horizontally to a 3:2 landscape composition without cropping or stretching the original photograph. Keep the man at essentially his original scale and full original vertical extent, now positioned slightly right of center. Add generous neutral medium-gray studio backdrop mainly to the LEFT, with a smaller extension on the right. Naturally continue any blazer/shoulder edge that reaches the original photo boundary, without changing the existing garments.
Composition/framing: final 3:2 aspect ratio; all hair, head and visible torso from the source remain visible, with the same top and bottom extents. Subject stays clear and suitable for a full-width mobile content image without a taller aspect ratio.
Lighting/mood: same soft balanced studio portrait lighting and seamless gray backdrop as source.
Constraints: change only the area needed for the horizontal outpainting; no altered facial identity, hairstyle, expression, shirt, jacket details or anatomy; no other people, text, logos, props, watermark, cropping, stretching, or added blank borders.
```

## Centered mobile outpaint. `hero-01-studio-navy-mobile-centered.jpg`

Generated with the built-in `image_gen` tool using `hero-01-studio-navy.jpg` as the edit target. The final image blends the central face and clothing from the original portrait over the generated outpainting to preserve identity and garment detail.

```text
Use case: identity-preserve outpainting / precise-object-edit
Asset type: centered 3:2 mobile hero portrait
Input image: the sole image is the EDIT TARGET, the selected studio portrait. Preserve this exact man's face, hair, moustache and chin beard, expression, navy blazer, pale shirt, lighting, and all visible torso details.
Primary request: expand the original portrait horizontally into a 3:2 landscape photo by outpainting the seamless medium-gray studio background EQUALLY on the LEFT and RIGHT. Position the man's face, sternum, and overall upper-body mass on the exact horizontal centerline of the final frame. He must not be shifted toward either edge. Keep approximately the original subject scale and all original top and bottom content visible; do not crop or stretch. Naturally continue shoulders and blazer only where the original borders require it.
Composition/framing: symmetric negative space at head height on both sides; centered professional head-and-upper-torso portrait; full hair and existing lower jacket/shirt visible; 3:2 aspect ratio so a full-width mobile display remains short.
Lighting/mood: unchanged soft balanced studio lighting and neutral medium-gray background, natural photographic texture.
Constraints: preserve the person and clothing without noticeable regeneration; do not add people, props, text, logos, watermark, blank bars, asymmetrical empty space, cropping, or distortion.
```
