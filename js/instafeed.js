var loadButton = document.getElementById('load-more');
var feed = new Instafeed({
    get: 'user',
    userId: 1562518463,
    accessToken: 'IGQVJVWUdYUF9fZA0FLYUJpVktSQlZAObFN4Ulc3WXltWTBKcFdfTDhXQnAwNG9ZAd2ZAaaUFmQUV0LVA4ejd4QXpaMW1BX0hpb1ZA5b3ZAEOGYwelQwa2NveFZAfSTNuTkwtcndSNldFcXZAJZAlZAsNGp5eXpLSwZDZD',
    target: 'instafeed',
    resolution: 'standard_resolution',
    limit: 9,
    template: '<div class="single-image"><a target="_blank" href="{{link}}"><img src="{{image}}" title="{{caption}}"/></a></div>',
    after: function () {
        if (!this.hasNext()) {
            loadButton.setAttribute('disabled', 'disabled');
        }
    },
});
loadButton.addEventListener('click', function () {
    feed.next();
});
feed.run();