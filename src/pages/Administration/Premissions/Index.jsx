import React, { useEffect, useState } from 'react';
import Breadcrumbs from 'components/shared/Breadcrumbs';
import Loader from 'components/shared/Loader';
import Tab from './_tab'


function Premissions() {
    const whereIam = [{ "Dashboard": null }, { "Uprawnienia": null }]

    return (
        <div>
            <Breadcrumbs items={whereIam} />
           
        </div>
    );
}

export default Premissions;