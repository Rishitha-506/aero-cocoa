import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Badge } from '../ui/Badge';
import { Mail, ShieldCheck, Sparkles, KeyRound } from 'lucide-react';

export interface AccountModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AccountModal: React.FC<AccountModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('ashley.richard@aerococoa.luxe');
  const [memberId] = useState('AC-8829-PRIVÉ');
  const [tier] = useState('Rose Gold Member');
  const [miles] = useState('42,500 Cocoa Miles');

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Member Salon & Account"
      subtitle="Exclusive portal for Aéro Cocoa privileged guests"
      maxWidth="lg"
    >
      <div className="space-y-6">
        {/* Prototype Honest Disclaimer */}
        <div className="p-3.5 bg-blush-pink/30 border border-blush-pink/60 rounded-2xl flex items-start gap-3">
          <Sparkles className="w-4 h-4 text-cocoa-brown mt-0.5 flex-shrink-0" />
          <p className="text-xs text-deep-chocolate leading-relaxed">
            <strong className="font-semibold">Demonstration Mode:</strong> Live member authentication and backend credential storage are not connected in Phase 1. This preview demonstrates the guest concierge interface.
          </p>
        </div>

        {/* Member profile summary card */}
        <div className="p-5 bg-white/70 border border-latte-beige rounded-2xl flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-blush-pink/50 border border-blush-pink flex items-center justify-center text-cocoa-brown font-serif text-xl font-bold">
              AR
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-serif text-lg font-semibold text-deep-chocolate">
                  Ashley & Richard
                </h4>
                <Badge variant="blush">{tier}</Badge>
              </div>
              <p className="text-xs text-deep-chocolate/70 font-mono mt-0.5">
                ID: {memberId}
              </p>
            </div>
          </div>
          <div className="text-right hidden sm:block">
            <p className="text-xs text-deep-chocolate/60">Reward Balance</p>
            <p className="font-serif text-base font-semibold text-cocoa-brown">{miles}</p>
          </div>
        </div>

        {/* Guest credentials form */}
        <div className="space-y-4">
          <Input
            label="Registered Concierge Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            icon={<Mail className="w-4 h-4" />}
          />
          <Input
            label="Salon Access Key / Password"
            type="password"
            defaultValue="••••••••••••"
            icon={<KeyRound className="w-4 h-4" />}
            helperText="Phase 1 demonstration credentials"
          />
        </div>

        {/* Benefits teaser */}
        <div className="p-4 bg-sage-mist/30 border border-sage-mist/70 rounded-2xl">
          <h5 className="text-xs font-semibold uppercase tracking-wider text-deep-chocolate/90 flex items-center gap-1.5 mb-2">
            <ShieldCheck className="w-4 h-4 text-cocoa-brown" />
            Current Privileges
          </h5>
          <ul className="text-xs text-deep-chocolate/80 space-y-1">
            <li>&bull; Unlimited access to Paris & Zürich Confectionery Salons</li>
            <li>&bull; Priority baggage handling with biometric boarding pass</li>
            <li>&bull; Complimentary champagne & seasonal macaron flights</li>
          </ul>
        </div>

        {/* Modal actions */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <Button variant="ghost" onClick={onClose}>
            Close Salon
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              alert('Demonstration: Member profile updated in prototype session.');
              onClose();
            }}
          >
            Save Preferences
          </Button>
        </div>
      </div>
    </Modal>
  );
};
