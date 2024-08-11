package com.example.demo.service;

import com.example.demo.map.Compte;
import com.example.demo.map.project.Post;
import com.example.demo.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class PostService {

    @Autowired
    private PostRepository postRepository;

    public PostService(PostRepository postRepository) {
        this.postRepository = postRepository;
    }

    public List<Post> getAllPosts() {

        List<Post> posts = postRepository.getAllPost();

        return  posts;
    }

    public void addPost(Post post) {
        post.setIdUser((Compte) SecurityContextHolder.getContext().getAuthentication().getPrincipal());
        post.setNumberOfLikes(0);
        post.setDateCreation(new Date());
        post.setNumberOfCommentary(0);

        postRepository.save(post);
    }
}
