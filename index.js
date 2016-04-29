module.exports = function(ret, conf, settings, opt) {
  fis.util.map(ret.src, function(subpath, file) {
    if (file.isJsLike) {
      var content = file.getContent();
      var replaceBeforeJS =
        'if(navigator.userAgent.toLowerCase().indexOf("mi")===-1){'+
        '  window.market = {}; '+
        '  window.market.registerAppStatus = window.market.checkApis = window.market.checkAppsOnMobile = function() {};'+
        '  window.market.getDeviceInfo = function(){return "{}"}'+
        '}'
        ;
      var replaceAfterJS =
        'if(navigator.userAgent.toLowerCase().indexOf("mi")===-1){'+
        '  window.ajaxData = {"os":"5.11.19","model":"MI 3","ro":"unknown","marketVersion":1914102,"imei":"357911d9ab2125b3e00ecd4a6a62fc73","miuiBigVersionName":"V7-dev","resolution":"1080*1920","webResVersion":248,"clientId":"bf60126bb9e2ecdad218adaa1f075f21","densityScaleFactor":3,"co":"CN","pageConfigVersion":123,"session":"ZEtq8LRPFNXboEka","deviceType":0,"la":"zh","sdk":"19"};'+
        '}'
        ;
      content = content.replace('/*replace-market-before*/', replaceBeforeJS);
      content = content.replace('/*replace-market-after*/', replaceAfterJS);
      file.setContent(content);
    }
  });
};
