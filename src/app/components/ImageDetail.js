'use strict';

var settings = require('../settings.js'),
    RESOURCE = settings.RESOURCE;

module.exports = Ember.Component.extend({

    classNames: ['image-detail__container'],

    image: null, // need

    resource: null, // need

    isLoadng: true,

    dataurl: null,

    onNewImage: function(){

        this.set('isLoading', true);

        var _self = this;

        return this.get('resource')
            .promiseResource(RESOURCE.FULLIMAGES, this.get('image'))
            .then(function(data){
                var domstring = URL.createObjectURL(new Blob([data]));
                _self.set('dataurl', domstring);
                _self.set('isLoading', false);
            });

    }.observes('image').on('init'),

    makeDrag: function(){
        jQuery('.image-detail__image-container').draggable();
    }.on('didInsertElement'),

    registerWheel: function(){
        var _self = this;
        jQuery(this.get('element')).on('wheel', function(e){
            _self.wheel(e.originalEvent);
        });
    }.on('didInsertElement'),

    wheel: function(e){
        var $img = jQuery('.image-detail__image-container'),
            currentWidth = $img.width(),
            currentHeight = $img.height(),
            speed = 0.04,
            nextWidth = currentWidth * (e.deltaY < 0 ? 1+speed : 1-speed),
            nextHeight = currentHeight * (e.deltaY < 0 ? 1+speed : 1-speed);
        if (nextWidth > 500 && nextWidth < 5000) {
            $img.css('width', nextWidth).css('height', nextHeight);
        }
    }

});