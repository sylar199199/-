var tGame = tGame || {};
tGame.SCORE = 0;
tGame.WINSCORE = 50;
tGame.PLAYTIME = 5;
tGame.SCALE = 0.5;
tGame.faceFrame=0;
tGame.pxRate=window.innerWidth/375;
tGame.publicKey="";
tGame.platformId="";
tGame.platformUrl="";
tGame.platformName="";
tGame.load=function(){
    tGame.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
}
tGame.Preload = function() {console.log('Preload') };
tGame.Preload.prototype = {
    preload: function() {
        this.game.load.spritesheet('bg', './assets/bg.png');
        this.game.load.spritesheet("boom",'./assets/boom.png');
        this.game.load.spritesheet('progress','./assets/pro.png');
        this.game.load.spritesheet('face','./assets/face.png',600,589,10);
        this.game.load.spritesheet('face1','./assets/face1.png',600,589,4);
        this.game.load.spritesheet('hand1','./assets/hand3.png');
        this.game.load.spritesheet('hand2','./assets/hand4.png');
        this.game.load.spritesheet('hand3','./assets/hand5.png');
        this.game.load.spritesheet('hand4','./assets/hand6.png');
        this.game.load.spritesheet('hand5','./assets/hand1.png');
        this.game.load.spritesheet('hand6','./assets/hand2.png');
        this.game.load.spritesheet('pa','./assets/pa.png');
        this.game.load.spritesheet('platformName', './assets/name.png');
        this.game.load.audio('killAudio1', "./assets/1.mp3");
        this.game.load.audio('killAudio2', "./assets/2.mp3");
        this.game.load.audio('killAudio3', "./assets/3.mp3");
        this.game.load.audio('killAudio4', "./assets/4.mp3");
        if(window.innerWidth * 2 > 750){
            tGame.SCALE  = (window.innerWidth*2 - 80)/750 * 0.5;
        }else if(window.innerWidth * 2 < 750){
            tGame.SCALE  = (window.innerWidth * 2)/750 * 0.5;
        }
        this.game.stage.backgroundColor = "#fff";
    },
    create: function() {
        //this.game.state.start('Play');
    }
}
tGame.MainMenu = function() { console.log('MainMenu') };
tGame.MainMenu.prototype = {
	create: function() {
        var bg = this.game.add.image(0, 200, 'bg');
        bg.width = window.innerWidth;
        // var platformName = this.game.add.image(window.innerWidth/4, this.game.world.bottom+150, 'platformName');
        // platformName.width = window.innerWidth/2;
        // platformName.height = window.innerHeight/2;
        // platformName.x = window.innerWidth/4;
        // platformName.y = this.game.world.bottom+150;
        var lotteryText = this.game.add.text(0, 0, "您还有 " + SevController.Date.LOTTERYNUM + " 次机会" , { font: "20px Microsoft YaHei",  fill: "#ff0000"});
        lotteryText.x = this.game.world.centerX - lotteryText._width / 2;
        lotteryText.y = this.game.world.centerY - this.game.world.height/3.4;
        var startbtn = this.game.add.button(5,this.game.world.height - 150, 'startbtn', this.startGame);
        var sharebtn = this.game.add.button(this.game.world.width - 155,this.game.world.height - 150, 'sharebtn', SevController.Fun.shareBtnClick);
        startbtn.scale.setTo(0.5);
        sharebtn.scale.setTo(0.5);
	},
    startGame: function() {
        if(typeof SevController.Api.Get.startGame === 'String'){
            $.getJSON(SevController.Api.Get.startGame,function(data){
                //  游戏次数减一后的逻辑
                //  ...
            })
        }
        SevController.Date.LOTTERYNUM -- ;
        this.game.state.start('Play');
    }
}
tGame.Play = function() { console.log('Play') };
tGame.Play.prototype = {
    preload:function(){
        //tGame.SCORE = 0 ;

        this.playtime = tGame.PLAYTIME;
        this.hitting = false;
        this.isStart=false;
        this.bg = this.game.add.image(0, 0 , 'bg');
        this.bg.width = window.innerWidth;
        this.bg.scale.setTo(tGame.pxRate/2);
        this.bodyHeight=371*tGame.pxRate;//人身体到脖子的高度
        let height2=window.innerWidth/750*571;
        var platformName = this.game.add.image(0, this.game.world.height-height2+50, 'platformName');
        platformName.width = window.innerWidth;
        platformName.height = height2;
        var logo=this.game.add.image(this.game.world.centerX-75*tGame.pxRate, this.game.world.height-210*tGame.pxRate, 'logo');
        logo.width = 160*tGame.pxRate;
        logo.height = 120*tGame.pxRate;
        //进度条
        this.progressBg = this.game.add.image(35*tGame.pxRate, 180*tGame.pxRate , 'progress');
        this.progressBg.scale.setTo(tGame.pxRate/3);
        // 用bitmap对象创建精灵
        var bmd = this.game.add.bitmapData(128,128);
        // 使用Canvas的api进行绘制
        bmd.ctx.beginPath();
        bmd.ctx.rect(0, 0, 150*tGame.pxRate, 300*tGame.pxRate);
        bmd.ctx.fillStyle = '#fff';
        bmd.ctx.fill();
        this.progress = this.game.add.sprite(40*tGame.pxRate, 190*tGame.pxRate, bmd);
        this.progress.width=15*tGame.pxRate;
        this.progress.height=300*tGame.pxRate;
        this.boom = this.game.add.image(45*tGame.pxRate, 170*tGame.pxRate , 'boom');
        this.boom.scale.setTo(tGame.pxRate/3);
        this.boom.anchor.setTo(0.5, 0.5);
        this.boomWidth=this.boom.width;
        this.boomHeight=this.boom.height;
        this.boomAM = this.game.add.tween(this.boom).to({
            width:this.boomWidth*1.5,
            height:this.boomHeight*1.5
        },200,null,false,0,-1,true);
        this.timeText = this.game.add.text(0, 0, "剩余：" + this.playtime + "s", {
            font: "18px Microsoft YaHei", fill: '#fe2e15'
        });
        this.timeText.x = 100;
        this.timeText.y = 70;
        this.scoreText = this.game.add.text(0, 0, "已打：" + tGame.SCORE + "下", {
            font: "18px Microsoft YaHei", fill: '#fe2e15'
        });
        this.scoreText.x = 100;
        this.scoreText.y = 100;
        //脸部动作
        this.face = this.game.add.sprite(0, 0,'face1',3);
        this.face.scale.setTo(0.6);
        this.face1 = this.game.add.sprite(0, 0,'face1',0);
        this.face1.scale.setTo(0.6);
        var faceanim = this.face1.animations.add('face1',[0 , 2]);
        faceanim.play(3,true);
        this.setFaceReset1(this.face);
        this.setFaceReset1(this.face1);
        this.face3 = this.game.add.sprite(0, 0,'face');
        this.face3.scale.setTo(0.6);
        this.setFaceReset(this.face3);
        this.face3.visible=false;
        //动画拖鞋
        this.hand1 = this.game.add.sprite(0, window.innerHeight-150*tGame.pxRate,'hand1');
        this.hand1.x=-170*tGame.pxRate;
        this.hand1.scale.setTo(tGame.SCALE);
        this.hand1.anchor.setTo(0, 1);
        this.hand1.angle=-50;
        this.hand2 = this.game.add.sprite(window.innerWidth, window.innerHeight,'hand2');
        this.hand2.scale.setTo(0.5);
        this.hand2.anchor.setTo(1, 1);
        this.hand2.angle=100;
        this.hand1.visible=false;
        this.hand2.visible=false;
        //暴击小拳拳
        this.hand3 = this.game.add.sprite(-300, tGame.pxRate*540,'hand3');
        //this.hand3.scale.setTo(0.6);
        this.hand3.width=638*0.6*tGame.pxRate;
        this.hand3.height=484*0.6*tGame.pxRate;
        // this.hand3.x=-80;
        // this.hand3.y=670;
        this.hand3.anchor.setTo(0, 1);
        this.hand4 = this.game.add.sprite(window.innerWidth+310*tGame.pxRate, tGame.pxRate*540,'hand4');
        //this.hand4.scale.setTo(0.6);
        this.hand4.width=638*0.6*tGame.pxRate;
        this.hand4.height=484*0.6*tGame.pxRate;
        this.hand4.anchor.setTo(1, 1);
        this.hand3.visible=false;
        this.hand4.visible=false;
        //默认拖鞋
        this.hand5 = this.game.add.sprite(-1000, window.innerHeight-50*tGame.pxRate,'hand5');
        this.hand5.x=-10*tGame.pxRate;
        this.hand5.scale.setTo(tGame.SCALE);
        this.hand5.anchor.setTo(0.2, 0.5);
        this.hand6 = this.game.add.sprite(window.innerWidth-70*tGame.pxRate, window.innerHeight-50*tGame.pxRate,'hand6');
        this.hand6.scale.setTo(0.5);
        this.hand6.anchor.setTo(0.2, 0.5);
        //音频
        this.killAudio1 = this.game.add.audio('killAudio1', 1);
        this.killAudio2 = this.game.add.audio('killAudio2', 1);
        this.killAudio3 = this.game.add.audio('killAudio3', 1);
        this.killAudio4 = this.game.add.audio('killAudio4', 1);
        //闪血
        var flashHP = this.game.add.bitmapData(window.innerWidth,window.innerHeight);
        flashHP.ctx.beginPath();
        flashHP.ctx.rect(0, 0, window.innerWidth, window.innerHeight);
        flashHP.ctx.fillStyle = '#cb2818';
        flashHP.ctx.fill();
        this.flashHP = this.game.add.sprite(0, 0, flashHP);
        this.flashHP.alpha=0;
        this.flashHP = this.game.add.tween(this.flashHP).to({
            alpha:0.2
        },100,null,false,0,1,true);
        //加分
        this.addScore = this.game.add.text(this.game.world.centerX-20, 70**tGame.pxRate, "", { font: "28px Arial Black", fill: "#fff" });
        this.addScore.stroke = "#de2b3e";
        this.addScore.strokeThickness = 16;
        this.addScore.setShadow(1, 1, "#333333", 2, true, true);
        this.addScoreY=this.addScore.y;
        this.addScoreAM=this.game.add.tween(this.addScore).to({
            y:this.addScoreY-50,
            alpha:0
        },150,null,false,0,0);
        var that=this;
        this.addScoreAM.onComplete.add(function(){
            that.addScore.text="";
            that.addScore.alpha=1;
            that.addScore.y=that.addScoreY;
        });
        //暴击加分
        this.addCritScore = this.game.add.text(this.game.world.centerX-60, 70**tGame.pxRate, "", { font: "36px Arial Black", fill: "#fff" });
        this.addCritScore.stroke = "#de2b3e";
        this.addCritScore.strokeThickness = 16;
        this.addCritScore.setShadow(1, 1, "#333333", 2, true, true);
        this.addCritScoreY=this.addCritScore.y;
        this.addCritScoreAM=this.game.add.tween(this.addCritScore).to({
            y:this.addCritScoreY-50,
            alpha:0,
            fontSize:42
        },150,null,false,0,0);
        this.addCritScoreAM.onComplete.add(function(){
            that.addCritScore.text="";
            that.addCritScore.alpha=1;
            that.addCritScore.y=that.addScoreY;
            console.log(this.addScoreY);
        });
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        platformName.bringToTop(95);
        logo.bringToTop(96);
        this.progressBg.bringToTop(97);
        this.progress.bringToTop(98);
        this.boom.bringToTop(99);
        this.hand1.bringToTop(99);
        this.hand2.bringToTop(99);
        this.hand3.bringToTop(99);
        this.hand4.bringToTop(99);
        this.hand5.bringToTop(99);
        this.hand6.bringToTop(99);
        //this.flashHP.bringChildToTop(120);
        this.hand1X=this.hand1.x;
        this.hand1Y=this.hand1.y;
        this.hand2X=this.hand2.x;
        this.hand2Y=this.hand2.y;
        this.hand3X=this.hand3.x;
        this.hand3Y=this.hand3.y;
        this.hand4X=this.hand4.x;
        this.hand4Y=this.hand4.y;
        this.hand5X=this.hand5.x;
        this.hand5Y=this.hand5.y;
        this.hand6X=this.hand6.x;
        this.hand6Y=this.hand6.y;
    },
    render:function(){
        //this.game.debug.spriteBounds(this.progress);
    },
    create: function() {
        this.playtimer = this.game.time.events.loop(1000, this.countdown, this);
        this.lotteryText2 = this.game.add.text(0, 0, "积分：100", { font: "20px Microsoft YaHei",  fill: "#ff0000"});
        this.lotteryText2.x = 20;
        this.lotteryText2.y = 20;
        //this.game.physics.arcade.enable();
    },
    setFacePosition:function(face){
        // if(tGame.faceFrame===4){
        //     face.x=this.game.world.centerX-face.width/2-22;
        //     face.y=this.body.y-face.height+50*tGame.pxRate;
        // }else{
        //
        // }
        this.setFaceReset(face);
    },
    setFaceReset:function(face){
        face.x=this.game.world.centerX-face.width/2+28*tGame.pxRate;
        face.y=this.bodyHeight-face.height+56*tGame.pxRate;
    },
    setFaceReset1:function(face){
        face.x=this.game.world.centerX-face.width/2-8*tGame.pxRate;
        face.y=this.bodyHeight-face.height+56*tGame.pxRate;
    },
    reSetHandPosition:function(){
        this.hand1.x=this.hand1X;
        this.hand1.y=this.hand1Y;
        this.hand2.x=this.hand2X;
        this.hand2.y=this.hand2Y;
        this.hand3.x=this.hand3X;
        this.hand3.y=this.hand3Y;
        this.hand4.x=this.hand4X;
        this.hand4.y=this.hand4Y;
        this.hand5.x=this.hand5X;
        this.hand5.y=this.hand5Y;
        this.hand6.x=this.hand6X;
        this.hand6.y=this.hand6Y;
        this.hand1.angle=-50;
        this.hand2.angle=50;
        this.hand3.angle=0;
        this.hand4.angle=0;
        this.hand5.angle=0;
        this.hand6.angle=0;
    },
    countdown: function(){
        this.playtime--;
        if(this.playtime >= 0){
            this.timeText.setText("剩余：" + this.playtime + "s");
        }else{
            this.hitting=true;
            this.game.time.events.remove(this.playtimer);
            this.hand1.destroy();
            this.hand2.destroy();
            this.hand3.destroy();
            this.hand4.destroy();
            this.face3.destroy();
            this.face3 = this.game.add.sprite(this.game.world.centerX-115, 0,'face',10);
            this.face3.scale.setTo(0.6);
            this.setFaceReset(this.face3);
            if(this.boomAM.isRunning){
                this.boomAM.stop();
            }
            var that=this;
            setTimeout(function(){
                //that.game.state.start('GameOver');
                // var decrypt = new JSEncrypt();
                // decrypt.setPrivateKey(tGame.publicKey);
                // showResult(decrypt.decrypt(tGame.WINSCORE));
                showResult();
            },0.1)
        }
    },
    update: function() {
        this.game.input.onDown.add(this.hitFace, this);
    },
    hitFace: function(e){
        console.log(e);
        var point = this.input;
        if(this.isStart){
            if(!this.hitting){
                var rdHand = null;
                console.log(e.worldX);
                var hittingDirection=e.worldX<this.game.world.centerX?"left":"right";
                var propagators={};
                var that=this;
                this.reSetHandPosition();
                if(tGame.SCORE>30){//判断是否暴击
                    this.hand1.destroy();
                    this.hand2.destroy();
                    this.hand3.visible=true;
                    this.hand4.visible=true;
                    rdHand = hittingDirection==="left"?3:4;
                    propagators={
                        x:hittingDirection==="left"?this.game.rnd.between(-50,50):window.innerWidth+this.game.rnd.between(50,150),
                        y:this.bodyHeight-this.game.rnd.between(-20,50),
                        angle:hittingDirection==="left"?this.game.rnd.between(30,50):this.game.rnd.between(-30,-50)
                    };
                }else{
                    rdHand = hittingDirection==="left"?1:2;
                    propagators={
                        x:hittingDirection==="left"?this.game.rnd.between(0,50):window.innerWidth+this.game.rnd.between(-50,0),
                        y:this.bodyHeight+this.game.rnd.between(300,350),
                        angle:hittingDirection==="left"?this.game.rnd.between(10,30):this.game.rnd.between(-10,-30)
                    };
                }
                //使用tween.from,它会从上面运行到中间
                //this.game.add.tween(this.hand1).from({y:-100},1000,Phaser.Easing.Bounce.Out,true);
                //使用tween.to
                this['hand'+rdHand].visible=true;
                if(rdHand===1||rdHand==3){//打击动画开始默认的拖鞋隐藏
                    this.hand5.visible=false;
                }else{
                    this.hand6.visible=false;
                }

                var handanim = this.game.add.tween(this['hand'+rdHand]).to(propagators,40,null,true,0,0,true);
                if(tGame.SCORE===30){
                    this.boomAM.start();
                }

                handanim.onComplete.add(function(){
                    //this['hand'+rdHand].destroy();
                    var rnx = this.game.rnd.between(-40,40);
                    var rny = this.game.rnd.between(-80,0);
                    var pa = this.game.add.sprite(this.game.world.centerX + rnx, this.game.world.centerY + rny,'pa');
                    pa.rotation = rny/10;
                    pa.scale.setTo(this.game.rnd.between(3,6)/10);
                    if(tGame.SCORE>30) {//判断是否暴击
                        this['killAudio3'].play();
                        this.hand5.visible=false
                        this.hand6.visible=false;
                        this.flashHP.start();//掉血效果
                        var addScore=100*this.game.rnd.between(1, 2);//加分
                        this.addCritScore.text="+"+addScore;
                        tGame.WINSCORE+=addScore;
                        this.addCritScoreAM.start();
                    }else{//没暴击和暴击显示隐藏不一样
                        this['killAudio' + this.game.rnd.between(1, 2)].play();
                        this['hand'+rdHand].visible=false;
                        if(rdHand===1||rdHand==3){
                            this.hand5.visible=true;
                        }else{
                            this.hand6.visible=true;
                        }
                        var addScore=10*this.game.rnd.between(1, 2);//加分
                        this.addScore.text="+"+addScore;
                        tGame.WINSCORE+=addScore;
                        this.addScoreAM.start();
                    }
                    setTimeout(function(){
                        that['killAudio4'].play();
                    },100)

                    this.setFacePosition(this.face3);
                    var faceInit=0;
                    if(tGame.SCORE>15&&tGame.SCORE<=30){
                        faceInit=3;
                    }else if(tGame.SCORE>30){
                        faceInit=6;
                    }
                    if(tGame.SCORE>30){//第三形态
                        if(rdHand===1||rdHand==3){
                            tGame.faceFrame=7;
                        }else{
                            tGame.faceFrame=8;
                        }
                    }else if(tGame.SCORE>15){//第二形态
                        if(rdHand===1||rdHand==3){
                            tGame.faceFrame=4;
                        }else{
                            tGame.faceFrame=5;
                        }
                    }else{//第一形态
                        if(rdHand===1||rdHand==3){
                            tGame.faceFrame=2;
                        }else{
                            tGame.faceFrame=1;
                        }
                    }
                    // var faceanim = this.face3.animations.add('face3',[tGame.faceFrame===4?4:faceInit , tGame.faceFrame]);
                    // faceanim.play(5, false);
                    this.face3.frame=tGame.faceFrame;

                    setTimeout(function(){
                        that.face3.frame=faceInit;
                        //进度条
                        if(that.progress.height>0){
                            that.progress.height-=10;
                        }
                        //this.face3.scale.setTo(0.6);
                        tGame.SCORE ++ ;
                        that.scoreText.setText("已打：" + tGame.SCORE + "下");
                        that.lotteryText2.setText("积分："+tGame.WINSCORE);
                        pa.destroy();
                    },100)
                },this);
            }
        }else{//第一次打击
            this.isStart=true;
            this.face.destroy()
            this.face1.destroy();
            this.face3.visible=true;
            this.hitFace(e);
        }
    },
}
tGame.GameOver = function() { console.log('GameOver') };
tGame.GameOver.prototype = {
    create: function() {

    }
}

tGame.game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.CANVAS, 'game');
tGame.game.state.add('Preload', tGame.Preload);
tGame.game.state.add('MainMenu', tGame.MainMenu);
tGame.game.state.add('Play', tGame.Play);
tGame.game.state.add('GameOver', tGame.GameOver);
//tGame.game.state.start('Preload');
