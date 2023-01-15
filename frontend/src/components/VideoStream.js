import React, { useEffect, useState } from "react";
import {Viewer} from '@techming/web-video-canvas';

function VideoStream(props) {
    useEffect(()=>{
        const viewer = new Viewer({
            divID: 'video_stream',
            host: '192.168.64.4',
            port: '9000',
            width: 640,
            height: 480,
            topic: '/viv/T265/camera/fisheye1/image_raw',
            type: 'ros_compressed'
        });

        return ()=> viewer.unmount();

    },[]);

    return (
            <div id='video_stream'>
            </div>
    );
}

export default VideoStream;