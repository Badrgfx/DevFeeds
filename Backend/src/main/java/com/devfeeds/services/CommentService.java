package com.devfeeds.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.devfeeds.entities.Comment;
import com.devfeeds.metier.CommentMetier;

@CrossOrigin("*")
@RestController
public class CommentService {
	@Autowired
	private CommentMetier commentMetier;

    @RequestMapping(value="/api/comments",method=RequestMethod.POST)
 	public Comment commentTopic(@RequestBody Comment comment){
 	     return commentMetier.saveComment(comment);
 	}
    
    

}
