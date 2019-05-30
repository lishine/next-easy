function slugify(text) {
    return text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/&/g, '-and-')
        .replace(/[^\w\s-]/g, '') // remove non-word [a-z0-9_], non-whitespace, non-hyphen characters
        .replace(/[\s_-]+/g, '-') // swap any length of whitespace, underscore, hyphen characters with a single _
        .replace(/^-+|-+$/g, '') // remove leading, trailing -
}

export const slugifyTitleOrSlug = (title, slug) => {
    if (slug) {
        return slug
    } else {
        return slugify(title)
    }
}
