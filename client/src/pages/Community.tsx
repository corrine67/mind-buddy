import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, MessageCircle, Send } from "lucide-react";
import { useState } from "react";

interface Post {
  id: string;
  anonymousName: string;
  content: string;
  reactions: Record<string, number>;
  replyCount: number;
  timestamp: Date;
}

const SAMPLE_POSTS: Post[] = [
  {
    id: "1",
    anonymousName: "Peaceful Phoenix",
    content: "Had a rough day at work, but I took a moment to breathe and it really helped. Small wins count!",
    reactions: { "❤️": 12, "👏": 8, "🙏": 5 },
    replyCount: 3,
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
  },
  {
    id: "2",
    anonymousName: "Hopeful Horizon",
    content: "Just finished my first week of meditation. Feeling more calm and centered. Highly recommend!",
    reactions: { "❤️": 24, "✨": 15, "🌟": 10 },
    replyCount: 7,
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
  },
  {
    id: "3",
    anonymousName: "Gentle Guardian",
    content: "Struggling with anxiety today, but reading everyone's supportive messages really helped. Thank you all.",
    reactions: { "❤️": 18, "🤗": 12, "💪": 8 },
    replyCount: 5,
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
  },
];

export default function Community() {
  const [posts, setPosts] = useState<Post[]>(SAMPLE_POSTS);
  const [newPost, setNewPost] = useState("");
  const [showPostForm, setShowPostForm] = useState(false);

  const handlePostSubmit = () => {
    if (!newPost.trim()) return;

    const post: Post = {
      id: Date.now().toString(),
      anonymousName: `Anonymous ${Math.floor(Math.random() * 1000)}`,
      content: newPost,
      reactions: {},
      replyCount: 0,
      timestamp: new Date(),
    };

    setPosts([post, ...posts]);
    setNewPost("");
    setShowPostForm(false);
  };

  const handleReaction = (postId: string, emoji: string) => {
    setPosts(
      posts.map((post) =>
        post.id === postId
          ? {
              ...post,
              reactions: {
                ...post.reactions,
                [emoji]: (post.reactions[emoji] || 0) + 1,
              },
            }
          : post
      )
    );
  };

  return (
    <div className="app-shell">
      <div className="app-content">
        <div className="container max-w-sm space-y-6 py-6">
          {/* Header */}
          <div className="space-y-2">
            <h1 className="text-2xl font-bold">Community Support</h1>
            <p className="text-sm text-muted-foreground">Share anonymously, support each other</p>
          </div>

          {/* New Post Button */}
          {!showPostForm && (
            <Button
              onClick={() => setShowPostForm(true)}
              className="w-full bg-gradient-to-r from-sky-500 to-blue-400 text-white hover:shadow-lg hover:shadow-sky-400/30"
            >
              Share Your Feelings
            </Button>
          )}

          {/* Post Form */}
          {showPostForm && (
            <Card className="card-gradient border-sky-200 space-y-3">
              <textarea
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                placeholder="Share what's on your mind... (anonymous)"
                className="w-full rounded-lg border border-border bg-input px-3 py-2 text-sm placeholder-muted-foreground focus:border-accent focus:outline-none"
                rows={4}
              />
              <div className="flex gap-2">
              <Button
                onClick={handlePostSubmit}
                disabled={!newPost.trim()}
                className="flex-1 bg-gradient-to-r from-sky-500 to-blue-400 text-white hover:shadow-lg hover:shadow-sky-400/30"
              >
                  <Send size={16} className="mr-2" />
                  Post
                </Button>
                <Button variant="outline" onClick={() => setShowPostForm(false)} className="flex-1">
                  Cancel
                </Button>
              </div>
            </Card>
          )}

          {/* Posts Feed */}
          <div className="space-y-3">
            {posts.map((post) => (
              <Card key={post.id} className="card-interactive space-y-3 border-sky-200">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-semibold text-accent">{post.anonymousName}</p>
                    <p className="text-xs text-muted-foreground">
                      {post.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </p>
                  </div>
                </div>

                <p className="text-sm leading-relaxed">{post.content}</p>

                {/* Reactions */}
                <div className="flex flex-wrap gap-2">
                  {["❤️", "👏", "🙏", "✨", "🤗", "💪"].map((emoji) => (
                    <button
                      key={emoji}
                      onClick={() => handleReaction(post.id, emoji)}
                      className="flex items-center gap-1 rounded-full bg-sky-100 px-2 py-1 text-xs transition-all duration-200 hover:bg-sky-200"
                    >
                      <span>{emoji}</span>
                      {post.reactions[emoji] > 0 && <span>{post.reactions[emoji]}</span>}
                    </button>
                  ))}
                </div>

                {/* Reply Count */}
                <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-sky-500">
                  <MessageCircle size={14} />
                  {post.replyCount} replies
                </button>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
