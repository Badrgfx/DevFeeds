package com.devfeeds.metier;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.devfeeds.dao.CommentRepository;
import com.devfeeds.entities.Comment;

@Service
public class CommentMetierImpl implements CommentMetier{

	@Autowired
	private CommentRepository commentRepository;
	@Override
	public Comment saveComment(Comment comment) {
		return commentRepository.save(comment);
	}

}
