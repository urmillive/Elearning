const Category = require("../../extra/category");

exports.getAllCategories = (req, res) =>
{
    Category.find()
        .then(categories => res.json(categories))
        .catch(err => res.status(400).json("Error: " + err));
};

exports.getCategoryById = (req, res) =>
{
    Category.findById(req.params.id)
        .then(category => res.json(category))
        .catch(err => res.status(400).json("Error: " + err));
};

exports.createCategory = (req, res) =>
{
    const newCategory = new Category({
        name: req.body.name
    });

    newCategory
        .save()
        .then(() => res.json("Category added!"))
        .catch(err => res.status(400).json("Error: " + err));
};

exports.updateCategory = (req, res) =>
{
    Category.findById(req.params.id)
        .then(category =>
        {
            category.name = req.body.name;

            category
                .save()
                .then(() => res.json("Category updated!"))
                .catch(err => res.status(400).json("Error: " + err));
        })
        .catch(err => res.status(400).json("Error: " + err));
};

exports.deleteCategory = (req, res) =>
{
    Category.findByIdAndDelete(req.params.id)
        .then(() => res.json("Category deleted."))
        .catch(err => res.status(400).json("Error: " + err));
};
