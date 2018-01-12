package com.devfeeds.metier;


import org.springframework.data.domain.Page;
import com.devfeeds.entities.Comment;
import com.devfeeds.entities.Topic;

public interface TopicMetier {
	
	public Page<Topic> listTopics(long userId,int page, int size);
	public Topic saveTopic(Topic topic);
	public void deleteTopic(Long id);
	public Topic findTopic(Long id, long userId);
	public Topic upVote (long topicId,long userId);
	public Topic unVote (long topicId,long userId);
	public Comment comment(long topicId, Comment comment);
	public Page<Comment> getCommentTopic (long id,int page, int size);
	public Page<Topic> getPopularTopics(long userId, int page, int size);
	public Page<Topic> getNewestTopics(long userId, int page, int size);
}
