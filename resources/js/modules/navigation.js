/**
 * Навигация
 */
class Navigation {

    /**
     * Navigation constructor
     */
    constructor() {
        this.init();
    }

    /**
     *
     * @returns {Navigation}
     */
    init() {

        /**
         * Управлява лявата колона
         */
        $(document).on('click', '#sidebarCollapse', function () {
            $('#sidebar').toggleClass('active');
        });


        $(document).on('click', '.lnk-home', function (e) {
            e.preventDefault();
            app.prepareHome();
        });

        /**
         * Оперира с базови линкове
         */
        $(document).on('click', '.lnk-modal', function (e) {

            e.preventDefault();

            let page = $(this).data('page'),
                modal = Handlebars.templates.modal;

            let html = '';

            switch (page) {
                case 'about':
                    html = modal({'title': 'За проекта', 'body': Handlebars.templates.about()});
                    break;
                case 'credits':
                    html = modal({'title': 'Кредити', 'body': Handlebars.templates.credits()});
                    break;
            }

            $('body').append(html)
            $('#innerModal').modal('show');

            /**
             * Премахваме модалния прозорец
             */
            $('#innerModal').one('hidden.bs.modal', function () {
                $(this).remove();
            });

        });

        return this;
    }
}