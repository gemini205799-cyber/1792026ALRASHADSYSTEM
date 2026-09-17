import React from 'react';
import { HospitalProvider, useHospital } from './context/HospitalContext';
import { Navbar } from './components/layout/Navbar';
import { Sidebar } from './components/layout/Sidebar';
import { CommandPalette } from './components/common/CommandPalette';
import { BarcodeScannerModal } from './components/common/BarcodeScannerModal';
import { PrintViewModal } from './components/common/PrintViewModal';

// Domain Components
import { CampusOverview } from './components/dashboard/CampusOverview';
import { SEHRModule } from './components/ehr/SEHRModule';
import { ForensicLegalModule } from './components/legal/ForensicLegalModule';
import { CateringEngineModule } from './components/catering/CateringEngineModule';
import { EMARModule } from './components/pharmacy/EMARModule';
import { ArchiveOPDModule } from './components/archive/ArchiveOPDModule';
import { CampusSpatialMap } from './components/campus/CampusSpatialMap';
import { EnterpriseHRModule } from './components/hr/EnterpriseHRModule';

const HospitalAppContent: React.FC = () => {
  const { activeDomain } = useHospital();

  const renderActiveDomain = () => {
    switch (activeDomain) {
      case 'CAMPUS_OVERVIEW':
        return <CampusOverview />;
      case 'SEHR':
        return <SEHRModule />;
      case 'MLEGAL':
        return <ForensicLegalModule />;
      case 'CAMPUS_CATERING':
        return <CateringEngineModule />;
      case 'EMAR_PHARMACY':
        return <EMARModule />;
      case 'OPD_ARCHIVE':
        return <ArchiveOPDModule />;
      case 'CAMPUS_MAP':
        return <CampusSpatialMap />;
      case 'ENTERPRISE_HR':
        return <EnterpriseHRModule />;
      default:
        return <CampusOverview />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-100/70 text-slate-800 font-sans overflow-hidden antialiased" dir="rtl">
      {/* Right Sidebar (RTL Native) */}
      <Sidebar />

      {/* Main Content Viewport */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden bg-slate-50">
        {/* Top Navbar */}
        <Navbar />

        {/* Scrollable Work Area */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-7">
          <div className="max-w-7xl mx-auto">
            {renderActiveDomain()}
          </div>
        </main>
      </div>

      {/* Global Modals and Portals */}
      <CommandPalette />
      <BarcodeScannerModal />
      <PrintViewModal />
    </div>
  );
};

export default function App() {
  return (
    <HospitalProvider>
      <HospitalAppContent />
    </HospitalProvider>
  );
}
