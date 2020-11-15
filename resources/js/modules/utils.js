let app = null;

Handlebars.partials = Handlebars.templates;

Handlebars.registerHelper('times', function (n, block) {
    var accum = '';
    for (var i = 0; i < n; ++i)
        accum += block.fn(i);
    return accum;
});

Handlebars.registerHelper('ifeq', function (a, b, options) {
    if (a == b) {
        return options.fn(this);
    }
    return options.inverse(this);
});

Handlebars.registerHelper('ifnoteq', function (a, b, options) {
    if (a != b) {
        return options.fn(this);
    }
    return options.inverse(this);
});

/**
 *
 */
const Utils = {

    /**
     *
     * @param items
     * @returns {[]}
     */
    normalise: function (items) {
        let list = {};
        let data = null, link = null;
        items.forEach(function (item, key) {
            data = item.data[0];
            link = item.links !== undefined ? item.links[0] : null;

            let date = new Date(data.date_created);

            let i = {
                'image': link !== null ? link.href : null,
                'title': data.title,
                'description': Utils.cutText(data.description, 200),
                'description_full': data.description,
                'media_type': data.media_type,
                'media_id': data.nasa_id,
                'keywords': data.keywords !== undefined ? data.keywords.join(', ') : 'Няма',
                'date_created': date.toDateString(),
                'center': data.center,
                'links': item.href
            };

            list[i.media_id] = i;
        });

        return list;
    },

    /**
     *
     * @param text
     * @param length
     * @returns {string|*}
     */
    cutText: function (text, length) {
        if (text == null) {
            return "";
        }
        if (text.length <= length) {
            return text;
        }

        text = text.substring(0, length).trim();
        return text + "...";
    }
}
