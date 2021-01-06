var cnt = 0;
        const roomHash = location.hash.substring(1); // 방번호 가져오기

        const enterBtn = document.querySelector("#enterBtn");
        const otherVideos = document.getElementById('otherVideos');
        let remonCall;
        let isConnected = false;
        let remon;
        let remonRoom = [];
        const key = "6e779e7ed3e3bf6301d6b49529863fa0ebea59b903f2972c5565ba12201edb34";
        const serviceId = "ad1f48ee-4e50-4e45-9cb8-ce667a272173";

        const config = {
            credential: {
                key: key,
                serviceId: serviceId,
                wsurl: "wss://signal.remotemonster.com/ws",
                resturl: "https://signal.remotemonster.com/rest",
            },
            // video 위치
            view: {
                // remote1: '#remoteVideo1',
                // remote2: '#remoteVideo2',
                local: '#localVideo',
                blocal: '#blocalVideo',
            },
            // video  설정
            media: {
                video: {
                    width: {
                        min: 250,
                        max: 250
                    },
                    height: {
                        min: 250,
                        max: 250
                    },
                    frameRate: {
                        min: 8,
                        max: 30
                    },
                    maxBandwidth: 250,
                    codec: 'H264'
                },
                audio: true
            }
        }
        // video css, 기타 설정
        const videoAttrs = {
            id: "other",
            class: "remote-video center w-320 h-240",
            autoplay: true,
            muted: true,
            playsinline: true,
            style: "z-index:1;background: rgba(0, 0, 0, 0.5); width: 250px;height: 250px; object-fit: cover; margin: 10px"
        }
        // 이벤트 리스너
        const listener = {
            onConnect(chid) {
                console.log(`remon.listener.onConnect ${chid} at listener`);
            },
            onComplete() {
                console.log(`remon.listener.onComplete: ${remon.getChannelId()} `);
                remonRoom[remon.getChannelId()] = true;
            },
            onDisconnectChannel() {
                // is called when other peer hang up.
                remon.close();
                isConnected = false;
            },
            onClose() {
                // is called when remon.close() method is called.
                console.log(`remon.listener.onClose: ${remon.getChannelId()}`);
            },
            onError(error) {
                console.log(`remon.listener.onError: ${remon.getChannelId()} ${error}`);
            },
            onStat(result) {
                // console.log(`EVENT FIRED: onStat:  ${JSON.stringify(result)}`);
            },
            onRoomEvent(result) {
                //join 방 입장, 나가기 시 반응
                switch (result.event) {
                    case 'join':
                        if (!remonRoom[result.channel.id]) {
                            remonRoom[result.channel.id] = true;
                            let newVideo = document.createElement('video')
                            videoAttrs.id = result.channel.id.replace(":", "-");
                            Object.keys(videoAttrs).forEach(key => newVideo.setAttribute(key, videoAttrs[key]))
                            config.view.remote = `#${newVideo.id}`
                            newVideo.remon = new Remon({
                                config
                            })
                            otherVideos.append(newVideo)
                            newVideo.remon.joinCast(newVideo.id.replace("-", ":"))
                        }
                        break;
                    case 'leave':
                        if (remonRoom[result.channel.id] && result.channel.id !== remon.getChannelId()) {
                            let video = document.getElementById(result.channel.id.replace(":", "-"));
                            otherVideos.removeChild(video);
                            delete remonRoom[result.channel.id]
                        }
                        break;
                }
                console.log(`EVENT FIRED: onRoomEvent channel Id : ${remon.getChannelId()}`)
                console.log(`EVENT FIRED: onRoomEvent: ${JSON.stringify(result)}`)
            }
        };
        /*
        <div class="user">
            <p>사용자1</p>
        </div>
        <div class="user">
            <p>사용자2</p>
        </div>
        <div class="user">
            <p>사용자3</p>
        </div>
        */
        // 영상 시작 또는 종료 하기 
        async function start(r) {
            // alert(r);
            if (isConnected) {
                cnt--;
                isConnected = false;
                document.querySelector('#enterBtn').innerHTML = "시작하기";
                Object.keys(remonRoom).forEach(function(id) {
                    if (id !== remon.getChannelId()) {
                        let video = document.getElementById(id.replace(":", "-"));
                        if (video && video.remon) {
                            otherVideos.removeChild(video);
                        }
                    }
                    delete remonRoom[id];
                })
                document.getElementById('join_user').innerHTML = "현재접속자리스트 (" + cnt + "/4)";
                remon.close()
            } else {
                isConnected = true;
                cnt++;
                document.querySelector('#enterBtn').innerHTML = "종료";
                remon = new Remon({
                    config,
                    listener
                });
                await remon.createRoom(r);
                let participants = await remon.fetchRooms(r);
                participants.forEach(async function(participant) {
                    if (!remonRoom[participant.id]) {
                        remonRoom[participant.id] = true;
                        let newVideo = document.createElement('video');
                        videoAttrs.id = participant.id.replace(":", "-");
                        Object.keys(videoAttrs).forEach(key => newVideo.setAttribute(key, videoAttrs[key]))
                        config.view.remote = `#${newVideo.id}`
                        newVideo.remon = new Remon({
                            config
                        })
                        otherVideos.append(newVideo)
                        await newVideo.remon.joinCast(newVideo.id.replace("-", ":"));
                    }
                })
                document.getElementById('join_user').innerHTML = "현재접속자리스트 (" + cnt + "/4)";
                document.getElementById('join_list').append('<div class="user"><p>' + newVideo.id + '</p></div>');
            }
        }


        enterBtn.addEventListener("click",
            evt => {
                start(roomHash);
                evt.preventDefault();
            },
            false
        );

        // const listener = {
        //     onConnect(chid) {
        //         $('#channelId').text(chid);
        //         $('#channelState').text("대기 중");
        //         console.log(`onConnect: ${chid}`);
        //     },
        //     onComplete() {
        //         $('#channelState').text("통화 중");
        //         console.log(`onComplete`);
        //     },
        //     onClose() {
        //         $('#channelState').text("통화 종료");
        //         console.log(`onClose`);
        //         remonCall.close();
        //         if ($('#localVideo')[0].srcObject) {
        //             $('#localVideo')[0].srcObject = undefined;
        //         }
        //         remonCall = new Remon({
        //             config: config,
        //             listener: listener
        //         });
        //     }
        // }

        // remonCall = new Remon({
        //     config: config,
        //     listener: listener
        // });

        // $('#startCall').click(function() {
        //     // connectCall의 인자는 통화채널의 ID입니다. 실제 서비스에서는 동일한 통화채널의 ID가 아닌, 고유하고 예측이 어려운 ID를 사용해야합니다.
        //     remonCall.connectCall('my-first-channel');
        // });

        // // "종료" 버튼을 클릭하면 통화채널에서 나갑니다.
        // $('#stopCall').click(function() {
        //     remonCall.close();
        // });
