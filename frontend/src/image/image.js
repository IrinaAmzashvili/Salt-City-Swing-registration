import bannerPic from './dance-image-1.jpg';
import logo from './logo/Salt-City-Swing-Shadow-sans-slogan-trans.png'
import classImage from './classImages/36378340_10216838799225971_2708978462206459904_n.jpg'

export function ClassImage() {
    return (classImage);
}

export function BannerPic() {
    return (bannerPic);
}

export function Logo() {
    return (logo);
}


function importAll(req) {
    let images = {};

    req.keys().map((item, i) => {
        return images[item.replace('./', '')] = req(item);
    })
    console.log('--->', images)
    return images;
}

export const allImages = importAll(require.context('../image', false, /\.(png|jpe?g|svg)$/));

console.log('--->>>>',allImages)
