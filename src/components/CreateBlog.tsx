import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { blogService } from '../services/api';
import { Button } from './ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from './ui/Card';
import { X, Send } from 'lucide-react';
import type { CreateBlogInput } from '../types/blog.ts';

interface CreateBlogProps {
    onClose: () => void;
    onSuccess: () => void;
}

export function CreateBlog({ onClose, onSuccess }: CreateBlogProps) {
    const queryClient = useQueryClient();
    const [formData, setFormData] = useState<CreateBlogInput>({
        title: '',
        category: ['FINANCE'],
        description: '',
        date: new Date().toISOString(),
        coverImage: 'https://images.pexels.com/photos/669614/pexels-photo-669614.jpeg',
        content: '',
    });

    const mutation = useMutation({
        mutationFn: blogService.createBlog,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['blogs'] });
            onSuccess();
        },
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        mutation.mutate(formData);
    };

    return (
        <Card className="max-w-2xl mx-auto shadow-2xl border-primary/20">
            <CardHeader className="flex flex-row items-center justify-between border-b pb-4">
                <CardTitle className="text-2xl font-bold">New Blog Draft</CardTitle>
                <Button variant="ghost" size="sm" onClick={onClose}>
                    <X className="w-5 h-5" />
                </Button>
            </CardHeader>
            <CardContent className="pt-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-semibold">Title</label>
                        <input
                            type="text"
                            required
                            className="w-full p-2.5 rounded-lg border focus:ring-2 focus:ring-primary/50 outline-none transition-all"
                            placeholder="Enter a catchy title..."
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-semibold">Category (comma separated)</label>
                            <input
                                type="text"
                                required
                                className="w-full p-2.5 rounded-lg border focus:ring-2 focus:ring-primary/50 outline-none transition-all"
                                placeholder="FINANCE, TECH"
                                value={formData.category.join(', ')}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value.split(',').map(s => s.trim()) })}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-semibold">Date</label>
                            <input
                                type="datetime-local"
                                required
                                className="w-full p-2.5 rounded-lg border focus:ring-2 focus:ring-primary/50 outline-none transition-all"
                                value={formData.date.slice(0, 16)}
                                onChange={(e) => setFormData({ ...formData, date: new Date(e.target.value).toISOString() })}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold">Description (Short Summary)</label>
                        <textarea
                            required
                            rows={3}
                            className="w-full p-2.5 rounded-lg border focus:ring-2 focus:ring-primary/50 outline-none transition-all resize-none"
                            placeholder="Briefly describe what this article is about..."
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold">Full Content</label>
                        <textarea
                            required
                            rows={8}
                            className="w-full p-2.5 rounded-lg border focus:ring-2 focus:ring-primary/50 outline-none transition-all"
                            placeholder="Write your article here..."
                            value={formData.content}
                            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                        />
                    </div>

                    <div className="flex justify-end gap-3 pt-4 border-t">
                        <Button type="button" variant="outline" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={mutation.isPending} className="gap-2 px-8">
                            {mutation.isPending ? 'Publishing...' : (
                                <>
                                    <Send className="w-4 h-4" />
                                    Publish Blog
                                </>
                            )}
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}
