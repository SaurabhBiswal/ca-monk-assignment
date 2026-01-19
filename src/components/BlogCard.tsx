import type { Blog } from '../types/blog.ts';
import { Card, CardContent } from './ui/Card';
import { Calendar, Tag } from 'lucide-react';

interface BlogCardProps {
    blog: Blog;
    isActive?: boolean;
    onClick: () => void;
}

export function BlogCard({ blog, isActive, onClick }: BlogCardProps) {
    const formattedDate = new Date(blog.date).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    });

    return (
        <Card
            className={`cursor-pointer transition-all hover:border-primary/50 ${isActive ? 'border-primary ring-1 ring-primary' : ''
                }`}
            onClick={onClick}
        >
            <CardContent className="p-4">
                <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="flex flex-wrap gap-1">
                        {blog.category.map((cat) => (
                            <span
                                key={cat}
                                className="inline-flex items-center rounded-full bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-700"
                            >
                                <Tag className="w-3 h-3 mr-1" />
                                {cat}
                            </span>
                        ))}
                    </div>
                    <span className="flex items-center text-xs text-muted-foreground whitespace-nowrap">
                        <Calendar className="w-3 h-3 mr-1" />
                        {formattedDate}
                    </span>
                </div>
                <h3 className="font-bold text-lg leading-tight mb-2 line-clamp-2">{blog.title}</h3>
                <p className="text-sm text-muted-foreground line-clamp-3">{blog.description}</p>
            </CardContent>
        </Card>
    );
}
