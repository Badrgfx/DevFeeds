package com.devfeeds.services;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.devfeeds.entities.Comment;
import com.devfeeds.entities.Topic;
import com.devfeeds.metier.StorageService;
import com.devfeeds.metier.TopicMetier;

@CrossOrigin("*")
@RestController
public class TopicService {
	@Autowired
    TopicMetier topicMetier;
	
	@Autowired
	StorageService storageService;
    
    @RequestMapping(value="/api/topics",method=RequestMethod.GET)
    public Page<Topic> getAllTopics(
    		@RequestParam int page,@RequestParam int size, @RequestParam long id){
    	return topicMetier.getNewestTopics(id,page,size);
	}
    
    @RequestMapping(value="/api/topics/{id}",method=RequestMethod.GET)
    public Topic getTopic(@PathVariable(name="id")long id, @RequestParam long userId){
    	return topicMetier.findTopic(id, userId);
	}
    
	@RequestMapping(value="/api/topics",method=RequestMethod.POST)
    public Topic SaveTopic(@RequestBody Topic topic){
		return topicMetier.saveTopic(topic);
	}
	
    @RequestMapping(value="/api/topics/{id}/vote",method=RequestMethod.PUT)
	public Topic voteTopic(@PathVariable(name="id")long id,
			@RequestParam long userId){
	     return topicMetier.upVote(id, userId);
	}
    
    @RequestMapping(value="/api/topics/{id}/unvote",method=RequestMethod.PUT)
	public Topic unVoteTopic(@PathVariable(name="id")long id,
			@RequestParam long userId){
	     return topicMetier.unVote(id, userId);
	}
    
    @RequestMapping(value="/api/topics/{id}/comment",method=RequestMethod.PUT)
 	public Comment commentTopic(@PathVariable(name="id")long id
 			,@RequestBody Comment comment){
 	     return topicMetier.comment(id, comment);
 	}
    
    
    @RequestMapping(value="/api/topics/{id}/comments",method=RequestMethod.GET)
    public Page<Comment> getTopicComments(@PathVariable(name="id")long id,
    		@RequestParam int page,@RequestParam int size){
    	return topicMetier.getCommentTopic(id,page,size);
	}
    
    @RequestMapping(value="/api/topics/popular",method=RequestMethod.GET)
    public Page<Topic> getPopularTopics(
    		@RequestParam int page,@RequestParam int size, @RequestParam long id){
    	return topicMetier.getPopularTopics(id,page,size);
	}
    
    
    @GetMapping("/api/files/{filename:.+}")
	@ResponseBody
	public ResponseEntity<Resource> getFile(@PathVariable String filename) {
		Resource file = storageService.loadFile(filename);
		return ResponseEntity.ok()
				.header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + file.getFilename() + "\"")
				.body(file);
	}
    
    @RequestMapping(value="/api/img",method=RequestMethod.POST)
	public void handleFileUpload(@RequestParam("file") MultipartFile file,@RequestParam("id") String id) {
		String message = "";
		try {
			storageService.store(file,id);
			message = "You successfully uploaded " + file.getOriginalFilename() + "!";
		} catch (Exception e) {
			message = "FAIL to upload " + file.getOriginalFilename() + "!";
		}
	}

}
