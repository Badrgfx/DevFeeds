package com.devfeeds.dao;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.devfeeds.entities.Topic;

public interface TopicRepository extends JpaRepository<Topic,Long> {
	


	@Query("select t from Topic t ORDER BY t.uservoted.size DESC")
	public Page<Topic> findAllTopicOrderByVote(Pageable pageable);
	
	public Page<Topic> findAllByOrderByDatePublicationDesc(Pageable pageable);
	

}
