package com.devfeeds.entities;

import java.io.Serializable;
import java.util.Collection;
import java.util.Date;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class Topic implements Serializable {
	
	@Id @GeneratedValue
	private long id;
	private String title;
	private String description;
	private String content;
	private Date datePublication;
	private int sizeComments;
	private int sizeVotes;
	private boolean votedByConnectuser;
	@ManyToOne
	@JoinColumn(name="userId")
	private User user;
	@ManyToMany(fetch = FetchType.LAZY,
            cascade = {
                    CascadeType.PERSIST,
                    CascadeType.MERGE
                },
                mappedBy = "topicsVoted")
	private Collection<User> uservoted;
	@OneToMany(mappedBy="topic",fetch=FetchType.LAZY)
	  private Collection<Comment> comments;
	
	public long getId() {
		return id;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
	
	public Date getDatePublication() {
		return datePublication;
	}
	public void setDatePublication(Date datePublication) {
		this.datePublication = datePublication;
	}
	
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public User getUser() {
		return user;
	}
	public void setUser(User user) {
		this.user = user;
	}
	
	public int getSizeComments() {
		return sizeComments;
	}
	public void setSizeComments(int sizeComments) {
		this.sizeComments = sizeComments;
	}
	public int getSizeVotes() {
		return sizeVotes;
	}
	public void setSizeVotes(int sizeVotes) {
		this.sizeVotes = sizeVotes;
	}
	
	public boolean isVotedByConnectuser() {
		return votedByConnectuser;
	}
	public void setVotedByConnectuser(boolean votedByConnectuser) {
		this.votedByConnectuser = votedByConnectuser;
	}
	@JsonIgnore
	public Collection<User> getUservoted() {
		return uservoted;
	}
	
	public void setUservoted(Collection<User> uservoted) {
		this.uservoted = uservoted;
	}
	@JsonIgnore
	public Collection<Comment> getComments() {
		return comments;
	}
	public void setComments(Collection<Comment> comments) {
		this.comments = comments;
	}
	public Topic() {
		super();
	}
	public Topic(String title, String content, Date datePublication, String description, User user) {
		super();
		this.title = title;
		this.content = content;
		this.datePublication = datePublication;
		this.user = user;
		this.votedByConnectuser=false;
		this.description = description;
	}

}
