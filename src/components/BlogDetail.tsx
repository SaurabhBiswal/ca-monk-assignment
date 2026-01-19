import { useQuery } from '@tanstack/react-query';
import { blogService } from '../services/api';
import { Calendar, Tag, User, Clock, Share2 } from 'lucide-react';
import { Button } from './ui/Button';

interface BlogDetailProps {
    blogId: string | null;
}

export function BlogDetail({ blogId }: BlogDetailProps) {
    const { data: blog, isLoading, error } = useQuery({
        queryKey: ['blog', blogId],
        queryFn: () => (blogId ? blogService.getBlogById(blogId) : null),
        enabled: !!blogId,
    });

    if (!blogId) {
        return (
            <div className="h-full flex flex-col items-center justify-center p-10 text-center text-muted-foreground">
                <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mb-4">
                    <Share2 className="w-10 h-10 opacity-20" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Select an article to read</h3>
                <p className="max-w-xs">
                    Choose a blog from the list on the left to see its full content and details.
                </p>
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className="p-8 space-y-6 animate-pulse">
                <div className="h-64 bg-muted rounded-3xl" />
                <div className="h-10 bg-muted rounded w-3/4" />
                <div className="space-y-4">
                    <div className="h-4 bg-muted rounded w-full" />
                    <div className="h-4 bg-muted rounded w-full" />
                    <div className="h-4 bg-muted rounded w-2/3" />
                </div>
            </div>
        );
    }

    if (error || !blog) {
        return (
            <div className="p-10 text-center">
                <p className="text-destructive font-semibold">Error loading blog content.</p>
                <p className="text-sm text-muted-foreground mt-2">The article might have been moved or deleted.</p>
            </div>
        );
    }

    const formattedDate = new Date(blog.date).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
    });

    return (
        <article className="max-w-4xl mx-auto p-4 md:p-8">
            <div className="relative aspect-video rounded-3xl overflow-hidden mb-8 shadow-2xl">
                <img
                    src={blog.coverImage}
                    alt={blog.title}
                    className="object-cover w-full h-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
            </div>

            <div className="space-y-6">
                <div className="space-y-2">
                    <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight">
                        {blog.title}
                    </h1>
                    <Button variant="outline" size="sm" className="bg-blue-600 text-white border-none hover:bg-blue-700">
                        <Share2 className="w-4 h-4 mr-2" /> Share Article
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 bg-slate-50 rounded-2xl border border-slate-100">
                    <div>
                        <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold mb-1">Category</p>
                        <p className="font-semibold text-slate-800">{blog.category.join(' & ')}</p>
                    </div>
                    <div>
                        <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold mb-1">Read Time</p>
                        <p className="font-semibold text-slate-800">5 Mins</p>
                    </div>
                    <div>
                        <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold mb-1">Date</p>
                        <p className="font-semibold text-slate-800">{formattedDate}</p>
                    </div>
                </div>

                <div className="text-lg leading-relaxed text-slate-700 space-y-6 whitespace-pre-wrap">
                    {blog.content}
                </div>

                <div className="pt-10 border-t flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden">
                            <User className="w-full h-full p-2 text-slate-500" />
                        </div>
                        <div>
                            <p className="font-bold text-sm">Written by Arjun Mehta</p>
                            <p className="text-xs text-muted-foreground">Senior Financial Analyst</p>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        {/* Simplified social icons */}
                        <Button variant="ghost" size="sm" className="opacity-40"><Share2 className="w-4 h-4" /></Button>
                    </div>
                </div>
            </div>
        </article>
    );
}
