package com.devfeeds.dao;



import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.devfeeds.entities.Comment;

public interface CommentRepository extends JpaRepository<Comment,Long> {
	
	@Query("select com from Comment com where com.topic.id=:TopicId ORDER BY com.datePub")
	public Page<Comment> getCommentTopic(@Param("TopicId") long TopicId, Pageable pageable);
	
	@Query("select COUNT(com) from Comment com where com.topic.id=:TopicId")
	public int getCommentsSize(@Param("TopicId") long TopicId);

	
}
