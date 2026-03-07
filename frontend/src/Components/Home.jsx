import React, { useEffect, useMemo, useState } from 'react';
import { ArrowRight, Bookmark, CloudSun, Flame, Home as HomeIcon, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const fallbackBlogs = [
  {
    id: 1,
    title: 'Nepal Advances Digital Governance With New Citizen Services Platform',
    content:
      'A national rollout is expected to improve service delivery in municipalities while lowering administrative delays.',
    genre: 'Politics',
    imageUrl:
      'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1400&q=80',
    createdAT: new Date().toISOString(),
    readTime: 5,
    appUser: { fullName: 'Nepalniti Bureau' },
  },
  {
    id: 2,
    title: 'Hydropower Investment Climbs as Regional Demand Keeps Rising',
    content: 'Industry experts point to stronger export contracts and faster transmission planning in key corridors.',
    genre: 'Business',
    imageUrl:
      'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1400&q=80',
    createdAT: new Date().toISOString(),
    readTime: 4,
    appUser: { fullName: 'Economic Desk' },
  },
  {
    id: 3,
    title: 'Kathmandu Tech Startups Focus on AI Tools for Public Utilities',
    content: 'Young founders are building practical AI products around transport, billing, and citizen communication.',
    genre: 'Technology',
    imageUrl:
      'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1400&q=80',
    createdAT: new Date().toISOString(),
    readTime: 6,
    appUser: { fullName: 'Innovation Team' },
  },
  {
    id: 4,
    title: 'New Conservation Plan Targets River Health and Urban Pollution',
    content: 'Municipal and federal agencies announced joint milestones for water quality and waste control.',
    genre: 'Environment',
    imageUrl:
      'https://images.unsplash.com/photo-1473773508845-188df298d2d1?auto=format&fit=crop&w=1400&q=80',
    createdAT: new Date().toISOString(),
    readTime: 5,
    appUser: { fullName: 'Climate Desk' },
  },
];

const Home = () => {
  const navigate = useNavigate();
  const [blogData, setBlogData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const api = await fetch('https://fullstack-blog-app-l5ph.onrender.com/blog');
        const data = await api.json();
        const sortedData = data.sort((a, b) => new Date(b.createdAT) - new Date(a.createdAT));
        setBlogData(sortedData.slice(0, 8));
      } catch (error) {
        setBlogData(fallbackBlogs);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const featured = useMemo(() => blogData[0] || fallbackBlogs[0], [blogData]);
  const latest = useMemo(() => (blogData.length ? blogData.slice(1, 5) : fallbackBlogs.slice(1)), [blogData]);
  const headlines = useMemo(() => (blogData.length ? blogData.slice(0, 4) : fallbackBlogs), [blogData]);

  const formatMeta = (blog) => {
    const date = blog?.createdAT ? new Date(blog.createdAT) : new Date();
    return `${date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })} • ${blog?.readTime || 5} min read`;
  };

  const openBlog = (id) => {
    navigate(`/blogdetails/${id}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f5f5f8] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-slate-200 border-t-[#d81224] rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <main className="bg-[#f5f5f8] min-h-screen text-slate-900">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8">
        <div className="grid grid-cols-12 gap-8">
          <aside className="hidden lg:block col-span-2">
            <div className="flex flex-col gap-6 sticky top-24">
              <div className="flex flex-col gap-2">
                <button className="flex items-center gap-3 px-3 py-2 rounded-lg bg-[#0a2a8a] text-white shadow-md text-sm font-medium">
                  <HomeIcon className="w-4 h-4" />
                  Top Stories
                </button>
                <button className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-200 text-sm font-medium">
                  <TrendingUp className="w-4 h-4" />
                  Trending
                </button>
                <button className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-200 text-sm font-medium">
                  <CloudSun className="w-4 h-4" />
                  Weather
                </button>
                <button className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-200 text-sm font-medium">
                  <Bookmark className="w-4 h-4" />
                  Saved
                </button>
              </div>

              <div className="pt-6 border-t border-slate-200">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-4">Trending Topics</h3>
                <div className="flex flex-col gap-3 text-sm">
                  <span className="flex justify-between"><span>#NepalPolicy</span><span className="text-xs bg-slate-200 px-2 py-0.5 rounded">7k</span></span>
                  <span className="flex justify-between"><span>#FederalBudget</span><span className="text-xs bg-slate-200 px-2 py-0.5 rounded">4k</span></span>
                  <span className="flex justify-between"><span>#TechNepal</span><span className="text-xs bg-slate-200 px-2 py-0.5 rounded">3k</span></span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-gradient-to-br from-[#0a2a8a] to-[#d81224] text-white">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs font-semibold opacity-80">Kathmandu, NP</span>
                  <CloudSun className="w-5 h-5 text-yellow-300" />
                </div>
                <div className="text-3xl font-bold">22°C</div>
                <div className="text-xs opacity-90">Mostly Sunny</div>
              </div>
            </div>
          </aside>

          <div className="col-span-12 lg:col-span-10 xl:col-span-7">
            <article className="group cursor-pointer overflow-hidden rounded-xl bg-white shadow-lg border border-slate-200 mb-10" onClick={() => openBlog(featured.id)}>
              <div className="aspect-[16/9] w-full overflow-hidden">
                <img
                  src={featured.imageUrl || fallbackBlogs[0].imageUrl}
                  alt={featured.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-8">
                <div className="flex items-center gap-4 mb-4">
                  <span className="bg-[#d81224] text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase">Breaking News</span>
                  <span className="text-slate-500 text-xs">{formatMeta(featured)}</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-4 group-hover:text-[#0a2a8a] transition-colors">
                  {featured.title}
                </h2>
                <p className="text-slate-600 text-lg leading-relaxed mb-6 clamp-3">{featured.content}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold">{featured?.appUser?.fullName || 'Nepalniti Desk'}</span>
                  <button className="flex items-center gap-2 text-[#0a2a8a] font-bold text-sm uppercase tracking-wide">
                    Read Full Story <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </article>

            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Latest News</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {latest.map((item) => (
                  <article
                    key={item.id}
                    onClick={() => openBlog(item.id)}
                    className="bg-white rounded-lg overflow-hidden border border-slate-200 hover:shadow-md transition-shadow cursor-pointer"
                  >
                    <img src={item.imageUrl || fallbackBlogs[1].imageUrl} alt={item.title} className="h-48 w-full object-cover" />
                    <div className="p-4">
                      <span className="text-[#0a2a8a] font-bold text-[10px] uppercase mb-2 block">{item.genre || 'News'}</span>
                      <h3 className="font-bold text-lg mb-2 clamp-2">{item.title}</h3>
                      <p className="text-slate-500 text-sm clamp-3 mb-4">{item.content}</p>
                      <span className="text-[10px] text-slate-400 uppercase font-medium">{formatMeta(item)}</span>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>

          <aside className="hidden xl:block xl:col-span-3">
            <div className="sticky top-24 space-y-8">
              <div className="bg-white p-6 rounded-xl border border-slate-200">
                <h3 className="text-lg font-bold mb-4 border-l-4 border-[#0a2a8a] pl-3">Top Headlines</h3>
                <div className="space-y-4">
                  {headlines.map((item) => (
                    <div key={item.id} className="group cursor-pointer" onClick={() => openBlog(item.id)}>
                      <h4 className="text-sm font-bold group-hover:text-[#0a2a8a] leading-tight transition-colors">{item.title}</h4>
                      <span className="text-[10px] text-slate-400 uppercase mt-1 block">{item.genre || 'News'} • {item.readTime || 5}m read</span>
                    </div>
                  ))}
                </div>
                <button className="w-full mt-6 py-2 text-xs font-bold text-[#0a2a8a] border border-[#0a2a8a]/20 rounded hover:bg-[#0a2a8a] hover:text-white transition-colors">
                  VIEW MORE
                </button>
              </div>

              <div className="bg-[#0a2a8a] p-6 rounded-xl text-white">
                <Flame className="w-7 h-7 mb-2" />
                <h3 className="text-lg font-bold mb-2">The Nepalniti Briefing</h3>
                <p className="text-xs text-white/80 mb-4 leading-relaxed">Key stories and analysis delivered to your inbox every morning.</p>
                <input
                  className="w-full bg-white/10 border border-white/20 rounded px-3 py-2 text-xs mb-3 placeholder:text-white/60 focus:ring-1 focus:ring-white"
                  placeholder="Your email address"
                  type="email"
                />
                <button className="w-full bg-[#d81224] text-white font-bold py-2 rounded text-xs hover:bg-[#b60f1e]">SUBSCRIBE NOW</button>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
};

export default Home;
