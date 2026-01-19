import { useQuery } from '@tanstack/react-query';
import { blogService } from '../services/api';
import { BlogCard } from './BlogCard';
import { Button } from './ui/Button';
import { Plus } from 'lucide-react';

interface BlogListProps {
    activeBlogId?: string;
    onSelectBlog: (id: string) => void;
    onAddBlog: () => void;
}

export function BlogList({ activeBlogId, onSelectBlog, onAddBlog }: BlogListProps) {
    const { data: blogs, isLoading, error } = useQuery({
        queryKey: ['blogs'],
        queryFn: blogService.getAllBlogs,
    });

    if (isLoading) {
        return (
            <div className="space-y-4 p-4">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="h-40 rounded-xl bg-muted animate-pulse" />
                ))}
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-4 text-center">
                <p className="text-destructive">Error loading blogs. Please try again.</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full">
            <div className="p-4 border-b flex justify-between items-center sticky top-0 bg-background/80 backdrop-blur-sm z-10">
                <h2 className="text-xl font-bold">Latest Articles</h2>
                <Button size="sm" onClick={onAddBlog} className="gap-2">
                    <Plus className="w-4 h-4" />
                    Draft New
                </Button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {blogs?.map((blog) => (
                    <BlogCard
                        key={blog.id}
                        blog={blog}
                        isActive={blog.id === activeBlogId}
                        onClick={() => onSelectBlog(blog.id)}
                    />
                ))}
                {blogs?.length === 0 && (
                    <div className="text-center py-10 text-muted-foreground">
                        No blogs found. Start by creating one!
                    </div>
                )}
            </div>
        </div>
    );
}
