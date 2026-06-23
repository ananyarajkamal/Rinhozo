import React, { useState, useEffect } from 'react';
import { ArrowLeft, HardDrive, Download, Trash2, CheckCircle, RotateCw } from 'lucide-react';

interface OfflinePack {
  id: string;
  name: string;
  sizeMb: number;
  downloaded: boolean;
  progress?: number;
  status: 'idle' | 'downloading' | 'completed';
}

interface DownloadManagerProps {
  onBackToMap: () => void;
}

export const DownloadManager: React.FC<DownloadManagerProps> = ({ onBackToMap }) => {
  const [packs, setPacks] = useState<OfflinePack[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load download status from localStorage
    const savedPacks = localStorage.getItem('rinhozo_offline_packs');
    if (savedPacks) {
      setPacks(JSON.parse(savedPacks));
    } else {
      const defaultPacks: OfflinePack[] = [
        { id: 'algebra-reef', name: 'Algebra Reef Pack', sizeMb: 1.8, downloaded: true, status: 'completed' },
        { id: 'physics-volcano', name: 'Physics Volcano Pack', sizeMb: 2.4, downloaded: false, status: 'idle' },
        { id: 'history-island', name: 'History Island Pack', sizeMb: 2.1, downloaded: false, status: 'idle' }
      ];
      setPacks(defaultPacks);
      localStorage.setItem('rinhozo_offline_packs', JSON.stringify(defaultPacks));
    }
    setLoading(false);
  }, []);

  const savePacksState = (newPacks: OfflinePack[]) => {
    setPacks(newPacks);
    localStorage.setItem('rinhozo_offline_packs', JSON.stringify(newPacks));
  };

  const handleDownload = (packId: string) => {
    const pack = packs.find(p => p.id === packId);
    if (!pack || pack.status === 'downloading') return;

    // Set downloading state
    const updated = packs.map(p => {
      if (p.id === packId) {
        return { ...p, status: 'downloading' as const, progress: 0 };
      }
      return p;
    });
    savePacksState(updated);

    // Simulate download progress
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += 10;
      
      setPacks(prevPacks => {
        const nextPacks = prevPacks.map(p => {
          if (p.id === packId) {
            if (currentProgress >= 100) {
              clearInterval(interval);
              // Save completed state after loop completes
              setTimeout(() => {
                const finalPacks = prevPacks.map(item => 
                  item.id === packId 
                    ? { ...item, status: 'completed' as const, downloaded: true, progress: undefined }
                    : item
                );
                savePacksState(finalPacks);
              }, 100);
              return { ...p, progress: 100 };
            }
            return { ...p, progress: currentProgress };
          }
          return p;
        });
        return nextPacks;
      });
    }, 150);
  };

  const handleDelete = (packId: string) => {
    const updated = packs.map(p => {
      if (p.id === packId) {
        return { ...p, status: 'idle' as const, downloaded: false, progress: undefined };
      }
      return p;
    });
    savePacksState(updated);
  };

  // Calculate stats
  const downloadedPacks = packs.filter(p => p.downloaded);
  const totalSizeUsed = downloadedPacks.reduce((acc, p) => acc + p.sizeMb, 0).toFixed(1);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#faf6f0] flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-4 border-[#d4a574]/20 border-t-[#d4a574] animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#faf6f0] text-[#1e293b] flex flex-col p-4 md:p-6 select-none">
      
      {/* HEADER */}
      <div className="w-full max-w-lg mx-auto flex items-center justify-between mb-6">
        <button 
          onClick={onBackToMap}
          className="p-2.5 rounded-full hover:bg-[#f0ebe3] text-[#78716c] hover:text-[#1e293b] transition-all cursor-pointer"
        >
          <ArrowLeft size={20} />
        </button>
        <span className="text-sm font-bold uppercase tracking-wider text-[#78716c]">Download Manager</span>
        <div className="w-10"></div> {/* Spacer */}
      </div>

      {/* DOWNLOAD MANAGER BOX */}
      <div className="w-full max-w-md mx-auto bg-white border border-[#e5dec9] rounded-3xl p-6 shadow-md flex flex-col gap-6 text-left">
        
        {/* STORAGE DISK BAR */}
        <div className="bg-[#faf6f0] border border-[#e5dec9]/60 rounded-2xl p-4 flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#1e293b]/5 flex items-center justify-center text-[#1e293b]">
              <HardDrive size={18} />
            </div>
            <div>
              <span className="text-xs font-bold text-[#1e293b] block">Offline Storage Usage</span>
              <span className="text-[11px] font-semibold text-[#78716c] block mt-0.5">
                {totalSizeUsed} MB used of 128 MB cache limit.
              </span>
            </div>
          </div>
          
          {/* Progress bar */}
          <div className="w-full h-2 bg-[#f0ebe3] rounded-full overflow-hidden">
            <div 
              className="h-full bg-[#1e293b] transition-all duration-300"
              style={{ width: `${(Number(totalSizeUsed) / 128) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* LIST OF PACKS */}
        <div className="space-y-3.5">
          <span className="text-[10px] font-bold text-[#78716c] uppercase tracking-widest block">Available Lesson Packs</span>
          
          {packs.map((pack) => {
            return (
              <div 
                key={pack.id}
                className="p-4 border border-[#e5dec9]/60 rounded-2xl flex flex-col gap-3"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-xs font-bold text-[#1e293b]">{pack.name}</h4>
                    <span className="text-[11px] font-semibold text-[#78716c] mt-0.5 block">
                      Size: {pack.sizeMb} MB
                    </span>
                  </div>

                  {/* Actions */}
                  {pack.status === 'completed' && (
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-100 rounded-full px-2.5 py-1 flex items-center gap-1.5">
                        <CheckCircle size={10} />
                        Offline Ready
                      </span>
                      <button
                        onClick={() => handleDelete(pack.id)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-xl transition-all cursor-pointer"
                        title="Delete Offline Cache"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  )}

                  {pack.status === 'idle' && (
                    <button
                      onClick={() => handleDownload(pack.id)}
                      className="flex items-center gap-1.5 bg-[#1e293b] hover:bg-[#0f172a] text-white px-3.5 py-1.5 rounded-xl text-xs font-bold shadow-sm transition-all cursor-pointer"
                    >
                      <Download size={12} />
                      Download
                    </button>
                  )}

                  {pack.status === 'downloading' && (
                    <span className="text-[10px] font-bold text-[#78716c] bg-[#faf6f0] border border-[#e5dec9]/50 rounded-full px-2.5 py-1 flex items-center gap-1.5">
                      <RotateCw size={10} className="animate-spin" />
                      Downloading {pack.progress}%
                    </span>
                  )}
                </div>

                {/* Progress bar inside cards if active downloading */}
                {pack.status === 'downloading' && (
                  <div className="w-full h-1 bg-[#faf6f0] rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-[#1e293b] transition-all duration-150"
                      style={{ width: `${pack.progress}%` }}
                    ></div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* HELPER STATEMENT */}
        <div className="text-[11px] font-semibold text-[#78716c] leading-relaxed border-t border-[#e5dec9]/40 pt-4">
          Lesson packs can be downloaded to study offline when you do not have cellular data or internet connection.
        </div>

      </div>

    </div>
  );
};
export default DownloadManager;
