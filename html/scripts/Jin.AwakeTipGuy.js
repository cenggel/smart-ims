// JavaScript Document
/*
Jin.AwakeTipGuy  l.j
*/
if (!Jin) var Jin = {};

Jin.AwakeTipGuy = new Class({
    Implements: Options,
    options: {
        message: '',
        position: '',
        tipCss: 'document_gtips',
        time: '7000',
        setPosition: $empty

    },
    initialize: function(options) {
        this.setOptions(options);

    },
    show: function() {
        $(this.options.position).empty();
        var awake = new Element("ul", {
            'class': this.options.tipCss
        })
        .set('text', this.options.message);
        awake.inject($(this.options.position));

    },
    showAndHide: function() {
        if ($chk(this.options.setPosition)) {
            this.options.position = this.options.setPosition;

        }
        this.show();
        this.hide.delay(this.options.time, this);

    },
    hide: function() {
        if ($(this.options.position)) $(this.options.position).empty();

    }

});