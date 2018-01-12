package com.devfeeds.metier;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import com.devfeeds.dao.CommentRepository;
import com.devfeeds.dao.TopicRepository;
import com.devfeeds.dao.UserRepository;
import com.devfeeds.entities.Comment;
import com.devfeeds.entities.Topic;
import com.devfeeds.entities.User;

@Service
public class TopicMetierImpl implements TopicMetier {

	@Autowired
	private TopicRepository topicRepository;
	@Autowired
	private UserRepository userRepository;
	@Autowired
	private CommentRepository commentRepository;

	public Page<Topic> listTopics(long userId,int page, int size) {
		Page<Topic> listTopicWithSize = topicRepository.findAll(new PageRequest(page, size));
		for (Topic topic : listTopicWithSize) {
			topic.setSizeComments(topic.getComments().size());
			topic.setSizeVotes(topic.getUservoted().size());
			for(User user : topic.getUservoted())
			if(user.getId()==userId) {
				topic.setVotedByConnectuser(true);
			}
		}
		return listTopicWithSize;
	}

	public Topic saveTopic(Topic topic) {
		topic.setDatePublication(new Date());
		return topicRepository.save(topic);
	}

	public void deleteTopic(Long id) {
		topicRepository.delete(id);	
	}

	public Topic findTopic(Long id,long userId) {
		Topic t = topicRepository.findOne(id);
		t.setSizeComments(t.getComments().size());
		t.setSizeVotes(t.getUservoted().size());
		for(User user : t.getUservoted()) {
		if(user.getId()==userId) {
			t.setVotedByConnectuser(true);
		  }
	    }
		return t;
	}

	
	public Topic upVote(long topicId, long userId) {
		Topic topic = topicRepository.findOne(topicId);
		User user = userRepository.findOne(userId);
		topic.setVotedByConnectuser(true);
		topic.getUservoted().add(user);
		user.getTopicsVoted().add(topic);
		return topicRepository.save(topic);
	}

	public Topic unVote(long topicId, long userId) {
		Topic topic = topicRepository.findOne(topicId);
		User user = userRepository.findOne(userId);
		topic.setVotedByConnectuser(false);
		topic.getUservoted().remove(user);
		user.getTopicsVoted().remove(topic);
		return topicRepository.save(topic);
	}
	
	public Comment comment(long topicId,Comment comment) {
		Topic topic = topicRepository.findOne(topicId);
		comment.setTopic(topic);
		comment.setDatePub(new Date());
		System.out.println(comment.getDatePub());
		commentRepository.save(comment);
		return comment;
	}
	
	public Page<Comment> getCommentTopic (long id, int page, int size) {
		return commentRepository.getCommentTopic(id, new PageRequest(page, size));
	}

	
	public Page<Topic> getPopularTopics(long userId, int page, int size) {
		Page<Topic> listTopicWithSize = topicRepository.findAllTopicOrderByVote(new PageRequest(page, size));
		for (Topic topic : listTopicWithSize) {
			topic.setSizeComments(topic.getComments().size());
			topic.setSizeVotes(topic.getUservoted().size());
			for(User user : topic.getUservoted())
			if(user.getId()==userId) {
				topic.setVotedByConnectuser(true);
			}
		}
		return listTopicWithSize;
	}
	
	public Page<Topic> getNewestTopics(long userId, int page, int size) {
		Page<Topic> listTopicWithSize = topicRepository.findAllByOrderByDatePublicationDesc(new PageRequest(page, size));
		for (Topic topic : listTopicWithSize) {
			topic.setSizeComments(topic.getComments().size());
			topic.setSizeVotes(topic.getUservoted().size());
			for(User user : topic.getUservoted())
			if(user.getId()==userId) {
				topic.setVotedByConnectuser(true);
			}
		}
		return listTopicWithSize;
	}
	


}
