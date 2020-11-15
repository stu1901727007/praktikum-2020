/**
 *  Application class
 */
class App {

    /**
     * App constructor
     */
    constructor() {
        app = this

        this.init();
        this.layout();

        return this;
    }

    /**
     *
     * @returns {App}
     */
    init() {

        let that = this;

        AOS.init({once: true});

        that.currentResult = null;
        this.navigation = new Navigation();
        this.search = new Search();
        this.api = new Api();

        $(document).on('click', '.grid-item a', function (e) {
            e.preventDefault();

            const parent = $(this).closest('.grid-item'),
                id = parent.data('id');

            if (that.currentResult !== null) {
                if (that.currentResult.items[id] !== undefined) {

                    let item = that.currentResult.items[id];
                    if (item.media_type === 'image') {
                        that.loadMedia(item);
                    } else {
                        app.api.callMedia(item, that.loadMedia);
                    }
                }
            }
        });

        return this;
    }

    /**
     *
     * @returns {App}
     */
    layout() {
        $('body').html(Handlebars.templates.layout());

        this.pageContainer = $('#page-wrapper .page-container');
        this.resetResult();
        this.prepareHome();

        return this;
    }

    /**
     *
     * @returns {App}
     */
    resetResult() {
        this.currentResult = null;
        this.currentpage = 1;

        return this;
    }

    /**
     *
     * @returns {App}
     */
    prepareHome() {

        this.pageContainer.append(Handlebars.templates.home());

        this.loadHome();

        return this;
    }

    /**
     *
     * @returns {App}
     */
    loadHome() {

        const topics = ['mars', 'voyager', 'viking', 'spacex']

        this.search.showSimpleFilter();

        let popular = {q: topics[Math.floor(Math.random() * topics.length)], 'media_type': 'image,video,audio'};

        try {
            this.api.call(popular, this.loadPopular.bind(this));
        } catch (error) {
        }

        return this;
    }

    /**
     *
     * @param result
     * @returns {App}
     */
    loadPopular(result) {

        if (result === undefined || result === null) {
            throw new ValidationError('Имам проблем със заявката!');
        }

        this.resetResult();
        this.currentResult = result;

        this.setHtmlContainer(Handlebars.templates.results({'title': 'Избор на редактора'}));

        if (result.total_hits > 0) {

            this.setHtmlResult(result.items);

        } else {
            this.setHtmlContainer(Handlebars.templates.missing);
        }

        return this;
    }

    /**
     *
     * @param result
     * @returns {App}
     */
    loadResults(result) {

        this.resetResult();

        this.currentResult = result;

        this.setHtmlContainer(Handlebars.templates.results({'title': 'Резултати'}));

        if (result.total_hits > 0) {

            this.setHtmlResult(result.items);

        } else {
            this.setHtmlContainer(Handlebars.templates.missing);
        }

        return this;
    }

    /**
     *
     * @param result
     * @returns {App}
     */
    loadMedia(result) {

        let modal = Handlebars.templates.modalMedia;

        let html = modal({'item': result});

        $('body').append(html)
        $('#mediaModal').modal('show');

        $('#mediaModal').one('hidden.bs.modal', function () {
            $(this).remove();
        });

        return this;
    }

    /**
     *
     * @param html
     * @returns {App}
     */
    setHtmlContainer(html) {
        this.pageContainer.find('.data-wrapper').empty();
        this.pageContainer.find('.data-wrapper').html(html);

        return this;
    }

    /**
     *
     * @param items
     * @returns {App}
     */
    setHtmlResult(items) {

        const html = Handlebars.templates.item({'items': items});

        $('.data-wrapper .results-container').html(html);
        $('.data-wrapper').imagesLoaded(function () {

            $('.data-wrapper .placeholders').fadeOut();
            $('.data-wrapper .results-container').removeClass('d-none')

            $('.results-container').masonry({
                itemSelector: '.grid-item',
                gutter: 0
            });

            var lazy = new LazyLoad({
                elements_selector: ".lazy",
                callback_loaded: function () {
                    $('.results-container').masonry('layout');
                }
            });
        });

        return this;
    }
}

$(function () {
    new App();
});
