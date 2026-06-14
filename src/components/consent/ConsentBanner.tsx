import * as React from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

export function ConsentBanner() {
  const [isVisible, setIsVisible] = React.useState(() => {
    if (typeof window !== 'undefined') {
      return !localStorage.getItem('assignmento-consent');
    }
    return false;
  });
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  // Remove the useEffect that was setting state

  const handleAcceptAll = () => {
    localStorage.setItem('assignmento-consent', JSON.stringify({ analytics: true, advertising: true }));
    setIsVisible(false);
  };

  const handleDeclineAll = () => {
    localStorage.setItem('assignmento-consent', JSON.stringify({ analytics: false, advertising: false }));
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <>
      <div className="fixed bottom-0 left-0 w-full bg-background border-t border-border p-4 z-[100] shadow-2xl">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm text-muted-foreground text-center md:text-left">
            We use cookies to enhance your experience and analyze our traffic. 
            By clicking "Accept All", you consent to our use of cookies.
          </div>
          <div className="flex gap-2 shrink-0">
            <Button variant="ghost" size="sm" onClick={() => setIsModalOpen(true)}>
              Preferences
            </Button>
            <Button variant="outline" size="sm" onClick={handleDeclineAll}>
              Decline All
            </Button>
            <Button size="sm" onClick={handleAcceptAll}>
              Accept All
            </Button>
          </div>
        </div>
      </div>

      <ConsentModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSave={() => setIsVisible(false)}
      />
    </>
  );
}

function ConsentModal({ isOpen, onClose, onSave }: { isOpen: boolean, onClose: () => void, onSave: () => void }) {
  const [analytics, setAnalytics] = React.useState(true);
  const [advertising, setAdvertising] = React.useState(true);

  const handleSave = () => {
    localStorage.setItem('assignmento-consent', JSON.stringify({ analytics, advertising }));
    onSave();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Cookie Preferences</DialogTitle>
        </DialogHeader>
        <div className="space-y-6 py-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Essential Cookies</Label>
              <p className="text-xs text-muted-foreground">Required for the website to function correctly.</p>
            </div>
            <Switch checked disabled />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Analytics Cookies</Label>
              <p className="text-xs text-muted-foreground">Allow us to monitor site usage and improve performance.</p>
            </div>
            <Switch checked={analytics} onCheckedChange={setAnalytics} />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Advertising Cookies</Label>
              <p className="text-xs text-muted-foreground">Used to deliver more relevant advertisements to you.</p>
            </div>
            <Switch checked={advertising} onCheckedChange={setAdvertising} />
          </div>
        </div>
        <DialogFooter>
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSave}>Save Preferences</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
