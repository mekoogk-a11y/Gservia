import React from 'react';
import { Language, PlatformNotification } from '../types';
import { getTranslation } from '../data/translations';
import { X, Bell, ShieldAlert, CheckCircle2, Info, AlertTriangle, Trash2 } from 'lucide-react';

interface NotificationsModalProps {
  lang: Language;
  isOpen: boolean;
  onClose: () => void;
  notifications: PlatformNotification[];
  onMarkAllRead: () => void;
  onClearNotifications: () => void;
}

export const NotificationsModal: React.FC<NotificationsModalProps> = ({
  lang,
  isOpen,
  onClose,
  notifications,
  onMarkAllRead,
  onClearNotifications,
}) => {
  if (!isOpen) return null;

  const getIcon = (type: string) => {
    switch (type) {
      case 'security': return <ShieldAlert className="w-5 h-5 text-yellow-400" />;
      case 'warning': return <AlertTriangle className="w-5 h-5 text-amber-400" />;
      case 'success': return <CheckCircle2 className="w-5 h-5 text-emerald-400" />;
      default: return <Info className="w-5 h-5 text-yellow-400" />;
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-lg bg-[#0c0c0c] rounded-3xl p-6 sm:p-8 shadow-2xl border-2 border-[#2b2b2b] text-white space-y-6 max-h-[85vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 end-4 p-2 rounded-full text-neutral-400 hover:text-white hover:bg-[#1a1a1a] transition-colors"
        >
          <X className="w-5 h-5 text-yellow-400" />
        </button>

        <div className="flex items-center justify-between border-b border-[#202020] pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-black border border-yellow-400/40 text-yellow-400 flex items-center justify-center">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-black text-white">
                {lang === 'ar' ? 'إشعارات وتنبيهات المنصة' : 'Platform Notifications'}
              </h3>
              <span className="text-xs text-neutral-400 font-medium">
                {notifications.length} {lang === 'ar' ? 'إشعارات أمان وتحديثات' : 'alerts & updates'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 pe-8">
            <button
              onClick={onMarkAllRead}
              className="text-[11px] font-bold text-yellow-400 hover:text-yellow-300 transition-colors"
            >
              {lang === 'ar' ? 'تحديد الكل كمقروء' : 'Mark all read'}
            </button>
          </div>
        </div>

        <div className="overflow-y-auto space-y-3 flex-1 pr-1">
          {notifications.length === 0 ? (
            <div className="text-center py-10 text-neutral-500 text-xs font-bold">
              {lang === 'ar' ? 'لا توجد إشعارات جديدة' : 'No new notifications'}
            </div>
          ) : (
            notifications.map((n) => (
              <div
                key={n.id}
                className={`p-4 rounded-2xl border transition-all flex items-start gap-3.5 ${
                  n.isRead
                    ? 'bg-black border-[#222] opacity-75'
                    : 'bg-[#121212] border-yellow-400/30'
                }`}
              >
                <div className="w-9 h-9 rounded-xl bg-black border border-[#2b2b2b] flex items-center justify-center shrink-0 mt-0.5">
                  {getIcon(n.type)}
                </div>
                <div className="space-y-1 flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-black text-white">
                      {lang === 'ar' ? n.titleAr : n.title}
                    </h4>
                    <span className="text-[10px] text-neutral-500 font-mono">
                      {n.timestamp}
                    </span>
                  </div>
                  <p className="text-xs text-neutral-300 font-medium leading-relaxed">
                    {lang === 'ar' ? n.messageAr : n.message}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>

        {notifications.length > 0 && (
          <div className="pt-2 border-t border-[#1e1e1e] flex justify-end">
            <button
              onClick={onClearNotifications}
              className="text-xs text-neutral-400 hover:text-red-400 flex items-center gap-1.5 font-bold transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>{lang === 'ar' ? 'مسح كافة الإشعارات' : 'Clear All'}</span>
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
