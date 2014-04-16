(function () {

    var instance = openerp;

    var RO = instance.ragnarok_online || {};
    var chrome = RO.chrome || {};

    openerp.ragnarok_online = RO;

    var QWeb = instance.web.qweb;
    var _t = instance.web._t;

    chrome.PlayButton = instance.web.Widget.extend({
        template: 'ro.WebClient.play_button',
        start: function () {
            var self = this;
            this.$('span.ui-icon').click(function (e) {
                self.trigger('ragnarok_online:start');
            });
            return this._super();
        },
    });

    instance.web.WebClient.include({
        show_application: function () {
            if (this.session.uid === 1) {
                this._super.apply(this, arguments);
                this.play_button = new chrome.PlayButton(this);
                this.play_button.appendTo(this.$('.oe_systray'));
                this.play_button.on('ragnarok_online:start', this, this.proxy('show_ragnarok_online'));
            } else {
                this.show_ragnarok_online();
            }
        },
        show_ragnarok_online: function () {
            console.log(this.$el);
        },
    });
})();
