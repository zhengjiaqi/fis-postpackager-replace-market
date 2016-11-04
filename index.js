module.exports = function(ret, conf, settings, opt) {
  fis.util.map(ret.src, function(subpath, file) {
    handleFile(file);
  });
  fis.util.map(ret.pkg, function(subpath, file) {
    handleFile(file);
  });
  function handleFile(file) {
    if (file.isJsLike) {
      var content = file.getContent();
      var replaceBeforeJS =
          'var inMiMarket = true;'+
          'try {'+
          'market.getDeviceInfo();'+
          '} catch (e) {'+
          'inMiMarket = false;'+
          '}'+
          'if(!inMiMarket){'+
          '  window.market = window.marketAd = {}; '+
          '  market.registerViewStatus = marketAd.trackAdAction = window.market.registerAppStatus = window.market.checkApis = window.market.checkAppsOnMobile = function() {};'+
          '  window.market.getDeviceInfo = function(){return "{}"};'+
          '  window.market.recordCountEvent = function(){return "{}"};'+
          '}'
        ;
      var replaceAfterJS =
          'if(!inMiMarket){'+
          '  window.ajaxData = {"os":"5.11.19","model":"MI 3","ro":"unknown","marketVersion":1914102,"imei":"357911d9ab2125b3e00ecd4a6a62fc73","miuiBigVersionName":"V7-dev","resolution":"1080*1920","webResVersion":248,"clientId":"bf60126bb9e2ecdad218adaa1f075f21","densityScaleFactor":3,"co":"CN","pageConfigVersion":123,"session":"ZEtq8LRPFNXboEka","deviceType":0,"la":"zh","sdk":"19"};'+
          '}'
        ;
      content = content.replace('/*replace-market-before*/', replaceBeforeJS);
      content = content.replace('/*replace-market-after*/', replaceAfterJS);
      file.setContent(content);
    }
  }
};
