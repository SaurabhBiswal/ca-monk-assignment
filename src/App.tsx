import { useState } from 'react';
import { BlogList } from './components/BlogList';
import { BlogDetail } from './components/BlogDetail';
import { CreateBlog } from './components/CreateBlog';
import { GraduationCap, Search } from 'lucide-react';
import { Button } from './components/ui/Button';

function App() {
  const [selectedBlogId, setSelectedBlogId] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-[#fafafa]">
      {/* Header */}
      <header className="h-16 border-b bg-white flex items-center justify-between px-6 sticky top-0 z-30 shadow-sm">
        <div className="flex items-center gap-2">
          <div className="bg-indigo-600 p-1.5 rounded-lg">
            <GraduationCap className="w-6 h-6 text-white" />
          </div>
          <span className="font-extrabold text-xl tracking-tight text-slate-800 uppercase">CA Monk</span>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          {['Tools', 'Practice', 'Events', 'Job Board', 'Points'].map((item) => (
            <button key={item} className="text-sm font-medium text-slate-500 hover:text-indigo-600 transition-colors">
              {item}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" className="hidden sm:flex">
            <Search className="w-5 h-5 text-slate-400" />
          </Button>
          <Button variant="outline" size="sm" className="bg-indigo-600 text-white hover:bg-indigo-700 border-none px-6 rounded-full font-bold">
            Profile
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      {!isCreating && (
        <div className="bg-white py-16 px-6 text-center border-b">
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-4 tracking-tight">CA Monk Blog</h1>
          <p className="text-slate-500 max-w-2xl mx-auto text-xl leading-relaxed">
            Stay updated with the latest trends in finance, accounting, and career growth
          </p>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 container mx-auto max-w-[1400px] px-4 py-8">
        {isCreating ? (
          <div className="max-w-3xl mx-auto">
            <CreateBlog
              onClose={() => setIsCreating(false)}
              onSuccess={() => {
                setIsCreating(false);
              }}
            />
          </div>
        ) : (
          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* Left Panel: Blog List */}
            <div className="w-full md:w-[400px] shrink-0 md:sticky md:top-24 mb-8 md:mb-0">
              <div className="bg-white rounded-2xl shadow-sm border overflow-hidden h-[600px] md:h-[calc(100vh-140px)] flex flex-col">
                <BlogList
                  activeBlogId={selectedBlogId || undefined}
                  onSelectBlog={setSelectedBlogId}
                  onAddBlog={() => setIsCreating(true)}
                />
              </div>
            </div>

            {/* Right Panel: Blog Detail */}
            <div className="flex-1 w-full bg-white rounded-2xl shadow-sm border min-h-[600px]">
              <BlogDetail blogId={selectedBlogId} />
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-[#0f1115] text-white py-12 px-6">
        <div className="container mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <GraduationCap className="w-6 h-6" />
              <span className="font-bold text-xl uppercase">CA Monk</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Empowering the next generation of financial leaders with tools, community, and knowledge.
            </p>
          </div>
          {['Resources', 'Platform', 'Connect'].map((title) => (
            <div key={title} className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">{title}</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>{title === 'Resources' ? 'Blog' : title === 'Platform' ? 'Job Board' : 'LinkedIn'}</li>
                <li>{title === 'Resources' ? 'Webinars' : title === 'Platform' ? 'Practice Tests' : 'Twitter'}</li>
                <li>{title === 'Resources' ? 'Case Studies' : title === 'Platform' ? 'Mentorship' : 'Instagram'}</li>
              </ul>
            </div>
          ))}
        </div>
        <div className="container mx-auto max-w-6xl pt-12 mt-12 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500 gap-4">
          <p>© 2026 CA Monk. All rights reserved.</p>
          <div className="flex gap-8">
            <button className="hover:text-white">Privacy Policy</button>
            <button className="hover:text-white">Terms of Service</button>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
