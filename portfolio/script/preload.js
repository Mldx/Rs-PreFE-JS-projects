function preloadImg() {
    let preload = [
        'images/header/logo_gold.svg',
        'images/social/fb_gold.svg',
        'images/social/inst_gold.svg',
        'images/social/pinterest_gold.svg',
        'images/social/tw_gold.svg',
        'images/video/Play_hover_gold.svg',
        'images/header/sun_gold.svg',
        'images/header/sun.svg',
        'images/header/moon.svg',
        'images/header/sun_gold.svg',
        'images/header/moon_gold.svg',
    ]
    for (let i = 0; i < preload.length; i++) {
        const img = new Image();
        img.src = preload[i];
    }
}

export default preloadImg;