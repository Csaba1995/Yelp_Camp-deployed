var Campground = require("../models/campground");
var Comment = require("../models/comment");
//All middleware goes here
var middlewareObj = {};

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "You need to be logged in to do that");
    res.redirect("/login");
};

middlewareObj.checkCampgroundOwnership = function(req, res, next){
    if(req.isAuthenticated()){
        Campground.findById(req.params.id, function(err, foundCampground){
            if(err){
                req.flash("error", "Campground not found");
                res.redirect("back");
            } else {
                //does user own campground?
                if(foundCampground.author.id.equals(req.user._id)) { //mongoose object, not string. req.user._id is string
                    next();
                } else {
                     //otherwise, redirect
                     req.flash("error", "You do not have the premission to do that!!!");
                    res.redirect("back");
                }
            }
        });
    } else {
        req.flash("error", "You need to be logged in to do that!");
        res.redirect("back");
    }
};

middlewareObj.checkCommentOwnership = function(req, res, next){
  if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if(err){
                res.redirect("back");
            } else {
                //does user own comment?
                if(foundComment.author.id.equals(req.user._id)) { //mongoose object, not string. req.user._id is string
                    next();
                } else {
                    req.flash("error", "You do not have premission to do that!");
                     //otherwise, redirect
                    res.redirect("back");
                }
            }
        });
    } else {
        req.flash("error", "You need to be logged in to do that!");
        res.redirect("back");
    }
}

module.exports = middlewareObj;