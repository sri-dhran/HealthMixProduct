/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { MessageCircleHeart } from 'lucide-react';

export const WhatsAppButton: React.FC = () => {
  const whatsappUrl = "https://wa.me/919845012345?text=Hello%20NutriMix!%20I%20have%20loaded%20your%20app%20and%20want%20to%20learn%20more%20about%20your%20100%25%20natural%20multigrain%20organic%20health%20mixtures.";

  return (
    <a
      id="whatsapp-floating-btn"
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-30 bg-emerald-500 hover:bg-emerald-600 text-white p-3.5 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group flex items-center justify-center animate-bounce duration-3000 ring-4 ring-emerald-500/20"
      aria-label="Direct WhatsApp Chat"
      title="Chat with NutriMix Grains Sourcing"
    >
      <MessageCircleHeart className="w-6.5 h-6.5 transition-transform group-hover:scale-110" />
    </a>
  );
};
