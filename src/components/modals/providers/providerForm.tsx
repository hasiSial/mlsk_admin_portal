import Dropdown from "@/components/ui/dropdown/Dropdown";
import Input from "@/components/ui/input/input";
import PhoneNumberInput from "@/components/ui/phone_number/PhoneNumberInput";
import ProfileUpload from "@/components/ui/profileUpload";
import { SetProviderManagementFormDefaultValues } from "@/forms/providerForm";
import { getCitiesRecord, getCountriesRecord, getStatesRecord } from "@/redux/common/slice";
import { useAppDispatch } from "@/redux/Hooks";
import type { RootState } from "@/redux/Store";
import React, { useEffect, useState, type FC } from "react";
import {  useFormContext } from "react-hook-form";
import { useSelector } from "react-redux";

const ProviderForm: FC<{ providerData?: any }> = ({ providerData }) => {
    const { setValue, reset, watch } = useFormContext();
    const dispatch = useAppDispatch();
    const [banner, setBanner] = useState<{ url: string | null; fullPath: string | null } | null>(null);
    const [selectedCountry, setSelectedCountry] = useState<{ value: number; name: string } | null>(null);
    const [selectedState, setSelectedState] = useState<{ value: number; name: string } | null>(null);
    const countries = useSelector((state: RootState) => state.commonApiManagement.countries);
    const states = useSelector((state: RootState) => state.commonApiManagement.states);
    const cities = useSelector((state: RootState) => state.commonApiManagement.cities);


    // Fetch countries on mount
    useEffect(() => {
        dispatch(getCountriesRecord());
    }, []);

    // this function I use for edit case
    useEffect(() => {
        if (!providerData || !countries.length) return;

        reset(SetProviderManagementFormDefaultValues(providerData));
        setBanner({
        url: providerData.avatar,
        fullPath: providerData.avatarFullPath,
        });

        const countryObj = countries.find((c) => c.name === providerData.country);

        if (countryObj) {
        setSelectedCountry({
            value: countryObj.countryId,
            name: countryObj.name,
        });
        setValue('countryId', countryObj.countryId);
        dispatch(getStatesRecord(countryObj.countryId));
        }
    }, [providerData, countries]);

    // this function i use for state
    useEffect(() => {
        if (!providerData || !states.length) return;

        const stateObj = states.find((s) => s.name === providerData.state);

        if (stateObj) {
        setSelectedState({
            value: stateObj.stateId,
            name: stateObj.name,
        });
        setValue('stateId', stateObj.name);
        dispatch(
            getCitiesRecord({
            countryIso: selectedCountry?.value,
            stateIso: stateObj.stateId,
            }),
        );
        }
    }, [states]);

    //this function I use fir select city
    useEffect(() => {
        if (!providerData || !cities.length) return;

        const cityObj = cities.find((c: any) => c.city === providerData.city);

        if (cityObj) {
        setValue('cityId', cityObj.city);
        }
    }, [cities]);

    useEffect(()=>{
        if(banner){
            setValue('bannerPicture',banner?.url)
        }
    },[banner])


    return (
        <div className="grid grid-cols-2 gap-3 justify-start">
            <div className="col-span-2 lg:col-span-1">
                <Input type="text" name="name" placeholder="Enter Provider Name" label="Enter Name" allowAsterisk rules={{ required: 'Provider name is required' }} classNames=""/>
            </div>
            <div className="col-span-2 lg:col-span-1">
                <PhoneNumberInput name="phoneNumber" label="Enter Phone Number" allowAsterisk rules={{ required: 'Phone number is required' }} />
            </div>
            <div className="col-span-2">
                <Input type="text" name="website" placeholder="Enter Wesbite Url" label="Website"classNames=""/>
            </div>
            <div className="col-span-2 lg:col-span-1">
                <Dropdown name="countryId" label='Country' 
                    data={countries.map((c) => ({
                        name: c.name,
                        value: String(c.countryId),
                    }))}
                    allowAsterisk 
                    // rules={{ required: 'Country is required' }}
                    isSearchAble
                    onChange={(val) => {
                        const obj = countries.find((c) => Number(c.countryId) === Number(val));
                        if (!obj) return;

                        setSelectedCountry({
                        value: obj.countryId,
                        name: obj.name,
                        });

                        setValue('countryId', val);
                        setValue('stateId', '');
                        setValue('cityId', '');

                        // dispatch(getStatesRecord(obj.countryId));
                    }}
                />
            </div>
            <div className="col-span-2 lg:col-span-1">
                <Dropdown name="stateId" label='State'
                    // data={states.map((s) => ({
                    //     name: s.name,
                    //     value: s.stateId,
                    // }))}
                    data={[]}
                    isSearchAble
                    allowAsterisk 
                    // onChange={(val) => {
                    //     const obj = states.find((s) => s.name === val);
                    //     if (!obj) return;

                    //     setSelectedState({
                    //     value: obj.stateId,
                    //     name: obj.name,
                    //     });

                    //     setValue('stateId', val);
                    //     setValue('cityId', '');

                    //     dispatch(
                    //     getCitiesRecord({
                    //         countryIso: selectedCountry!.value,
                    //         stateIso: obj.stateId,
                    //     }),
                    //     );
                    // }} 
                    // rules={{ required: 'State is required' }}
                />
            </div>
            <div className="col-span-2 lg:col-span-1">
                <Dropdown name="cityId" label='City' data={[]} allowAsterisk 
                // rules={{ required: 'City is required' }}
                />
            </div>
            <div className="col-span-2 lg:col-span-1">
                <Input type="text" name="zipCode" placeholder="Enter Zip Code" label="Enter Zip Code" allowAsterisk rules={{ required: 'Zip code is required' }} classNames=""/>
            </div>
            <div className="col-span-2 lg:col-span-1">
                <Input type="text" name="address" placeholder="Enter address" label="Address" classNames=""/>
            </div>
            <div className="col-span-2 lg:col-span-1">
                <Input type="text" name="referralCode" placeholder="Enter Referral Code" label="Enter Referral Code" allowAsterisk rules={{ required: 'Referral code is required' }} classNames=""/>
            </div>
            <div className="col-span-2">
                <ProfileUpload title='Upload Banner Picture' subTitle='PNG, JPEG, PDF Allowed Only' onChange={setBanner} value={banner}/>
            </div>
        
        </div>
    );
};

export default ProviderForm;