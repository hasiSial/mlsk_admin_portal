import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import Modalbody from '@/components/ui/modal/Body';
import Modalfooter from '@/components/ui/modal/Footer';
import Modalheader from '@/components/ui/modal/Header';
import Modal from '@/components/ui/modal/Modal';
import Icon from '@/components/ui/svg_icon/SvgIcon';
import type { FC } from 'react';

interface Props {
  close: () => void;
  data?: any;
}

const ViewUserProfilePaymentMethod: FC<Props> = ({ close, data = null }) => {
  return (
    <Modal classNames="md:max-w-[60%] md:min-w-[60%] h-fit overflow-x-auto scrollbar-thin" closeModal={close} backDrop>
      <Modalheader
        logoClasses="bg-error"
        customLogo={<Icon icon="/icons/card.svg" className="text-white" />}
        className="p-4"
        contentLocation="left"
        showCloseButton
        onCloseClick={close}
      >
        <h2 className="ps-4 text-primary text-xl font-normal">View Payment Methods</h2>
      </Modalheader>

      <Modalbody>
        <p className="text-base xl:text-xl font-normal text-textSecondary text-center">
          Update the booking dates for this reservation.
          <br />
          Confirm that the new dates are available and approved by the host.
          <br />
          Both the user and host will receive a notification once changes are saved.
        </p>
        <div className="bg-white mt-4">
          <Card className="p-4 2xl:p-6 space-y-4">
            <CardHeader className="text-cardHeading">Booking Dates</CardHeader>
            <CardContent className="m-0 p-0 space-y-3">
              <div className="flex w-1/2 items-center justify-start gap-4">
                <span>
                  <Icon icon="/icons/calender_outline.svg" stroke={true} className="text-primary" />
                </span>
                <div className="flex flex-col">
                  <label className={`block text-medium text-textSecondary text-sm xl:text-base`}>PREVIOUS BOOKING DATES</label>
                  <label className={`block text-medium text-secondary text-sm xl:text-base`}>15-17 March, 2025</label>
                </div>
              </div>
              <div className="flex w-1/2 items-center justify-start gap-4">
                <span>
                  <Icon icon="/icons/question_circle.svg" stroke={true} className="text-primary" />
                </span>
                <div className="flex flex-col">
                  <label className={`block text-medium text-textSecondary text-sm xl:text-base`}>SET NEW DATES</label>
                </div>
              </div>
              <div className="w-full flex items-center gap-4">
                <div className="w-full">
                  <label htmlFor="from" className="text-primary text-base">
                    From
                  </label>
                  <Input id="from" type="date" name="from" className="w-full !h-[40px] !rounded-2xl focus-visible:ring-1 focus-visible:ring-secondary focus-visible:outline-none" />
                </div>

                <div className="w-full">
                  <label htmlFor="till" className="text-primary text-base">
                    Till
                  </label>
                  <Input id="till" type="date" name="till" className="w-full !h-[40px] !rounded-2xl focus-visible:ring-1 focus-visible:ring-secondary focus-visible:outline-none" />
                </div>
              </div>
            </CardContent>
          </Card>{' '}
        </div>
      </Modalbody>

      <Modalfooter>
        <div className="flex items-center justify-end gap-3">
          <Button
            onClick={close}
            type="button"
            variant="outline"
            className="border border-textSecondary hover:border-secondary text-secondary roundedDefault w-[146px] h-[44px] hover:bg-secondary hover:text-white px-5 py-3"
          >
            Close
          </Button>

          <Button
            type="button"
            className="roundedDefault hover:bg-transparent bg-secondary hover:text-secondary border border-secondary hover:border-textSecondary text-white px-5 py-3 w-[200px] h-[44px]"
          >
            Save New Dates
          </Button>
        </div>
      </Modalfooter>
    </Modal>
  );
};

export default ViewUserProfilePaymentMethod;
