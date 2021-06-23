import bannerPic from './dance-image-1.jpg';
import logo from './logo/Salt-City-Swing-Shadow-sans-slogan-trans.png'

export function BannerPic() {
    return (bannerPic);
}

export function Logo() {
    return (logo);
}


function importAll(req) {
    let images = {};

    req.keys().map((item, i) => {
        images[item.replace('./', '')] = req(item);
    })
    console.log('--->', images)
    return images;
}

export const allImages = importAll(require.context('../image', false, /\.(png|jpe?g|svg)$/));

console.log('--->>>>',allImages)
