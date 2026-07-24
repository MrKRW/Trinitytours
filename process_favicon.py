from PIL import Image

def process_favicon(input_path, output_path):
    img = Image.open(input_path).convert("RGBA")
    datas = img.getdata()

    # Assuming the top-left pixel is the background color if it's not transparent
    bg_color = datas[0]
    
    new_data = []
    # If the image is not already transparent, we might want to make bg_color transparent
    # Let's consider nearly white colors as background if it's a white background, or just use the exact bg_color
    # To be safe, we make the exact background color transparent.
    # Alternatively, if there's already an alpha channel and bg_color alpha is 0, we do nothing.
    for item in datas:
        # If the pixel matches the background color and alpha is 255
        if item[0] == bg_color[0] and item[1] == bg_color[1] and item[2] == bg_color[2] and bg_color[3] > 0:
            new_data.append((255, 255, 255, 0)) # Transparent
        # If the background is already transparent, we don't need to do much, but let's do this just in case
        elif item[3] == 0:
             new_data.append((255, 255, 255, 0))
        # Sometimes images have white background but we want it transparent
        elif item[0] > 240 and item[1] > 240 and item[2] > 240:
             new_data.append((255, 255, 255, 0))
        else:
            new_data.append(item)

    img.putdata(new_data)

    # Get bounding box of non-zero alpha
    bbox = img.getbbox()
    if bbox:
        img = img.crop(bbox)
        
    # Make it square and centered
    width, height = img.size
    max_dim = max(width, height)
    
    # Add a little padding, say 10%
    pad = int(max_dim * 0.1)
    new_size = max_dim + 2 * pad
    
    new_img = Image.new("RGBA", (new_size, new_size), (0, 0, 0, 0))
    # Paste centered
    paste_x = (new_size - width) // 2
    paste_y = (new_size - height) // 2
    
    new_img.paste(img, (paste_x, paste_y))
    
    # Save as ICO
    new_img.save(output_path, format="ICO", sizes=[(16, 16), (32, 32), (48, 48), (64, 64), (128, 128), (256, 256)])
    print("Favicon processed and saved successfully.")

if __name__ == "__main__":
    process_favicon("forfavicon.png", "favicon.ico")
