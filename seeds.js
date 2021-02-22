var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
    {
        name: "Clouds Rest",
        image:"https://images.unsplash.com/photo-1533575770077-052fa2c609fc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
        description: "Aute id pariatur occaecat labore sint velit dolor cillum. Consectetur cillum deserunt occaecat ullamco nostrud do cupidatat ut ipsum qui ullamco. Tempor consectetur aute sunt dolor laborum ullamco non mollit fugiat. Sit esse labore esse eu do amet quis incididunt ea."
    },
    {
        name: "Canyon Floor",
        image:"https://images.unsplash.com/photo-1525209149972-1d3faa797c3c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        description: "Et in exercitation sit in cupidatat id Lorem fugiat consectetur occaecat dolore nisi sit. Dolor mollit deserunt qui Lorem. Tempor qui enim Lorem eiusmod adipisicing aute veniam quis officia. Ut consequat adipisicing tempor velit mollit est duis."
    },
    {
        name: "High Peek",
        image:"https://images.unsplash.com/photo-1534685157449-86b12aed151e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
        description: "Minim quis id et elit sint laborum commodo. Quis voluptate dolore irure Lorem. Aliqua exercitation dolore nisi mollit. Excepteur mollit irure consequat sit consectetur deserunt dolor reprehenderit. Exercitation nostrud aliqua Lorem Lorem sit anim duis qui consequat id. Eiusmod duis minim anim eu non minim ad in nostrud Lorem reprehenderit sunt nostrud."
    }
]


function seedDB(){
    //Remove all campgrounds
    Campground.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed campgrounds");
         //add a few campgrounds
        data.forEach(function(seed){
            Campground.create(seed, function(err, campground){
                if(err){
                    console.log(err);
                }else {
                    console.log("added a campground");
                    //create a comment
                    Comment.create(
                        {
                            text: "This place is great....",
                            author: "Homer"
                        }, function(err, comment){
                            if(err){
                                console.log(err);
                            }else {
                            campground.comments.push(comment );
                            campground.save();
                            console.log("created a new comment");
                            }
                        });
                }
            });
        });
    });
   
    //add a few comments 
}
module.exports = seedDB;