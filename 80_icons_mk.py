#!/usr/bin/env python

import os
import os.path

# from PIL import Image
import PIL
import PIL.Image
import PIL.ImageColor

# Absolute path to this script
scriptdir = os.path.dirname(os.path.abspath(__file__))

def rm_transparency(fname: str, color: tuple = (255, 255, 255)):
    try:
        fn_parts = os.path.splitext(fname)
        image = PIL.Image.open(fname)
        # If image has an alpha channel
        if image.mode == "RGBA":
            # Create a blank background image
            bg = PIL.Image.new("RGB", image.size, color)
            # Paste image to background image
            bg.paste(image, (0, 0), image)
            # Save pasted image as image
            dfn = f"{fn_parts[0]}_bg.png"
            if not os.path.isfile(dfn):
                bg.save(dfn, "PNG")
            else:
                print(f"Error file '{dfn}' exists")
    except Exception as ex:
        print("Error occured: ", ex)


def rm_transparency_n_addmarg(
    fname: str, pad_pixels_or_pct: any = 20, color: tuple = (255, 255, 255)
):
    try:
        fn_parts = os.path.splitext(fname)
        orig_im = PIL.Image.open(fname)
        pad_pixels = 50
        if isinstance(pad_pixels_or_pct, float):
            pad_pixels = int(1.0 * orig_im.width * pad_pixels_or_pct / 100.0)
        elif isinstance(pad_pixels_or_pct, int):
            pad_pixels = pad_pixels_or_pct
        else:
            print("Error incorrect data type for pad_pixels:", type(pad_pixels_or_pct))
        print(f"Using pad_pixels = {pad_pixels}")
        out_im = add_margin_n_resize(
            orig_im, pad_pixels, pad_pixels, pad_pixels, pad_pixels, color
        )
        # Save pasted image as image
        dfn = f"{fn_parts[0]}_bgp.png"
        if not os.path.isfile(dfn):
            out_im.save(dfn, "PNG")
        else:
            print(f"Error file '{dfn}' exists")
    except Exception as ex:
        print("Error occured: ", ex)


def add_margin(
    orig_im: PIL.Image, top, right, bottom, left, color: tuple = (255, 255, 255)
):
    width, height = orig_im.size
    new_width = width + right + left
    new_height = height + top + bottom
    # "RGB" <= pil_img.mode
    result = PIL.Image.new("RGB", (new_width, new_height), color)
    result.paste(orig_im, (left, top))
    return result


def add_margin_n_resize(
    orig_im: PIL.Image, top, right, bottom, left, color: tuple = (255, 255, 255)
):
    orig_width, orig_height = orig_im.size
    new_width = orig_width + right + left
    new_height = orig_height + top + bottom
    # "RGB" <= orig_pil_img.mode
    result = PIL.Image.new("RGB", (new_width, new_height), color)
    result.paste(orig_im, (left, top), orig_im)
    return result
    return result.resize(
        (orig_width, orig_height)
    )  # ,resample=PIL.Image.Resampling.LANCZOS)


def expand2square(pil_img: PIL.Image, background_color: tuple):
    width, height = pil_img.size
    if width == height:
        return pil_img
    elif width > height:
        result = PIL.Image.new(pil_img.mode, (width, width), background_color)
        result.paste(pil_img, (0, (width - height) // 2))
        return result
    else:
        result = PIL.Image.new(pil_img.mode, (height, height), background_color)
        result.paste(pil_img, ((height - width) // 2, 0))
        return result

water_color = PIL.ImageColor.getcolor("#8bb6ff", "RGB")
IFN = "web/images/icon.png"
rm_transparency(IFN,water_color)
rm_transparency_n_addmarg(IFN, 30.0,water_color)
