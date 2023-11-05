'use client'

import React, { useState, useEffect, FormEvent } from 'react';
import GuideTemplate from "@/components/ai-advisor/guide-template";
import ProgressBar from "@/components/ai-advisor/progress-bar";
import ScheduleCall from "@/components/ai-advisor/schedule-call";
import SquigglyLines from "@/components/home/squiggly-lines"
import { useCompletion } from 'ai/react';
import { motion } from 'framer-motion';
import { UserDetails } from '@/app/ai-advisor/page';
import { ChatHome } from '@/components/home/chat-home'

interface GuideProps {
  userDetails: UserDetails; // Use the imported UserDetails type here
}

const Guide: React.FC<GuideProps> = ({ userDetails }) => {
  const [currentGuideIndex, setCurrentGuideIndex] = useState(0);
  const [guideData, setGuideData] = useState<{ reference: string; isLoading: boolean }[]>([]);
  const { complete } = useCompletion({
    api: '/api/completion',
  });

  useEffect(() => {
    const fetchAllReferences = async () => {
      // Start with all guides marked as loading
      const initialGuideData = guide.map(() => ({ reference: '', isLoading: true }));
      setGuideData(initialGuideData);
    
      // Fetch all references in parallel
      const fetchPromises = guide.map((_, index) => {
        const prompt = `User details:\nGender: ${userDetails.gender}, Age: ${userDetails.age}, Corporate Cover: ${userDetails.corporateCover}, Additional Comments: ${userDetails.additionalComments}\n---\nReference guide: ${guide[index].reference}`;
        return complete(prompt)
          .then(response => response || '') // Ensure response is a string
          .catch(() => 'Error fetching reference'); // Handle errors
      });
    
      // Wait for all fetches to complete
      const references = await Promise.all(fetchPromises);
    
      // Update the guide data with the new references, no longer loading
      setGuideData(references.map(reference => ({
        reference, // `reference` is guaranteed to be a string now
        isLoading: false,
      })));
    };
    
  
    if (userDetails && guide.length > 0) {
      fetchAllReferences();
    }
  }, [complete, userDetails, guide]); // 'guide' needs to be added to dependencies array if it can change
  
  const goNext = () => {
    setCurrentGuideIndex(prevIndex => prevIndex + 1);
    window.scrollTo(0, 0);
  };

  const goBack = () => {
    setCurrentGuideIndex(prevIndex => prevIndex - 1);
    window.scrollTo(0, 0);
  };

  // Display a loader for the current guide if its reference hasn't loaded yet
  const renderCurrentGuide = () => {
    const currentGuide = guideData[currentGuideIndex];
    if (currentGuide?.isLoading) {
      return (
        <div className="flex justify-center items-center">
          <motion.div
            animate={{ rotate: 36000 }}
            transition={{ duration: 100, loop: Infinity, ease: "linear" }}
            className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full"
          />
        </div>
      );
    }

    return (
      <GuideTemplate
        index={guide[currentGuideIndex].index}
        title={guide[currentGuideIndex].title}
        reference={currentGuide?.reference}
      />
    );
  };

  return (
    <>
      {currentGuideIndex < guide.length ? (
        <>
          <div className="flex flex-col my-10 w-full max-w-screen-xl px-5 xl:px-0">
            {renderCurrentGuide()}
            <div className="flex justify-between mt-20">
              <button onClick={goBack} disabled={currentGuideIndex === 0} className="p-5 flex items-center mt-5 rounded-lg border justify-center font-semibold bg-blue-500 h-[50px] text-sm text-white transition-all hover:bg-white hover:text-blue-500">
                Back
              </button>
              <button onClick={goNext} disabled={currentGuideIndex === guide.length} className="p-5 flex items-center mt-5 rounded-lg border justify-center font-semibold bg-blue-500 h-[50px] text-sm text-white transition-all hover:bg-white hover:text-blue-500">
                Next
              </button>
            </div>
          </div>
          <ProgressBar currentIndex={currentGuideIndex} totalGuides={guide.length} />
          <ChatHome/>
        </>
      ) : (
        <div className='flex flex-col items-center'>
          <h1 className="mx-auto max-w-5xl font-display text-4xl text-center font-bold tracking-normal animate-fade-up drop-shadow-sm md:text-4xl md:leading-[3rem]">
            Talk to our{" "}
            <span className="relative whitespace-nowrap text-blue-600">
              <SquigglyLines />
              <span className="relative">professional advisors</span>
            </span>{" "}
            at your convenience!
          </h1>
          <ScheduleCall />
          <button onClick={goBack} disabled={currentGuideIndex === 0} className="w-[200px] center p-5 flex items-center mt-5 rounded-lg border justify-center bg-white h-[50px] text-sm text-gray-500 transition-all hover:bg-blue-500 hover:text-white">
            Go back
          </button>
        </div>
      )}
      
    </>
  );
};

export default Guide;

const reference = [
  `
  # Introduction

  By the name, health insurance looks like a cover for all health-related expenses.

  *Unfortunately, it is not*. Health Insurance in India, also called Mediclaim provides a lifetime cover on hospitalization expenses.

  Whether the hospitalization required is for more than 24 hours or less than 24 hours (called Day Care treatments like Cataract, Angioplasty, and Chemotherapy), the expenses for these hospitalizations can be covered under health insurance.
  
  # Why should you buy health insurance?
  
  You may argue that you are young today, and find hospitalization to be a remote possibility. Here's why you should cover hospitalization expenses through a health insurance policy:
  
  ## 1. The surge in lifestyle diseases.
  
  Modern-day lifestyle has changed drastically. We live sedentary lifestyles burdened with pollution, mental stress, and bad eating habits. Many individuals at a very young age are prone to lifestyle diseases like diabetes, hypertension, high cholesterol, even heart-related illnesses.
  
  Health Insurance is like looking for an emergency loan - you may not get it when you desperately need it. Insurers get very nervous, covering young individuals with a disease or medical history. They also find covering people above 50 years very tricky. They may request a medical check-up and further checks, curb benefits, demand an extra premium, even decline covers. It is therefore recommended that you start small and gradually get adequate health insurance, while you are young and healthy (say by the age of 35/40).
  
  ## 2. The increased cost of healthcare
  
  While diseases have become common, healthcare has become expensive. In the financial year 2017-18, India's retail healthcare inflation stood at 4.39%, which increased to 7.14% in the financial year 2018-19. On compounded inflation of 8%, a hospital bill of 3 Lakhs today will rise to Rs. 30 Lakhs in 30 years. Such costs can incur when you are retired or close to retirement. Why would you burn your savings and compromise in your retired life without insurance?
  
  ## 3. Access to Quality Healthcare:
  
  When a family member falls ill, we want to give then the best healthcare. (I vividly remember when my dad was diagnosed with a tumor (non-cancerous) in his head. We looked for the best surgeon available in our city to get him treated. I knew I had enough health insurance to take such a call.) Health Insurance ensures that come what may, you have the financial backing of a health insurance plan to avail the best healthcare.
  
  ## 4. Tax Benefits:
  
  Lastly, to sweeten the deal, health insurance premiums also give tax benefits under Section 80D of the Income Tax Act, 1961. You can claim a deduction of up to Rs.50,000 by investing in health insurance plans. Moreover, if you buy health insurance for your senior citizen parents. In that case, you can claim an additional deduction of up to Rs.50,000.
  
  # What are the different types of health insurance plans?
  
  ## 1️⃣ Individual Health Insurance
  
  Individual health insurance, as the name suggests, is one of the most common types of health insurance in India. It covers a single individual under a single policy. You can buy separate individual health covers for every member of your family. 
  
  One of the biggest advantages of individual health insurance is it insulates one family member's cover from another. This helps in ensuring that a claim by one member of the family will not impact the coverage of other family members. 
  
  ## 2️⃣ Family Floater Plans
  
  A family floater is a type of health insurance plan where you can cover your entire family under a single policy. The cover amount essentially 'floats' among all members covered under the floater plan, and is available to any and all of them!
  
  For a variety of reasons, family floaters are a wonderful alternative to individual health insurance policies. They are less complicated. The entire family is covered under one policy. You don’t have to manage multiple policies - this makes them incredibly easy to handle and keep track of. 
  
  So, instead of purchasing separate health insurance for each family member, you can buy a single floater plan that would cover the hospitalisation costs of all members.
  
  ## 3️⃣ Multi-Individual Health Insurance 
  
  A multi individual policy offers you the best of both - a family floater and an individual health cover. It gives you the option of insuring multiple family members in a single policy while retaining individual coverages for all of them. This could be a good option for large/joint family units who want to insure all relationships in a single policy but may not have that flexibility in a family floater plan. 
  
  ## 4️⃣ Senior Citizen Health Insurance
  
  These are plans specifically designed for individuals above the age of 60 years. If you’re finding it difficult to cover one or both of your parents under a regular health insurance plan, you can consider buying this plan for them. 
  
  Senior citizen health insurance policies may not require any medical tests. They, however, usually come with a lot of restrictions and limitations, like - 
  
  - **Waiting Period For Pre-existing Diseases:** The policy will not offer coverage for pre-existing diseases immediately after it is issued. The insurer may apply a waiting period of 2 to 4 years on pre-existing illnesses. You’ll be able to claim for pre-existing diseases only after the completion of the waiting period. 
  - **Copay:** Copay is a specific percentage of the claim you’ll have to pay out of your pocket before the insurer starts to pay. 
  - **Room Rent Limits:** The insurer may restrict the room rent per day that’s payable by the insurance policy in case of hospitalisation. If you stay in a room that’s more expensive than your eligible limits, you’ll have to pay the differential from your own pocket. There are also other deductions at the time of claim settlement for associated expenses during the hospital stay viz doctor’s fees, surgery expenses, etc (in case you exceed the room rent limit).
  - **Sub-limits On Specific Treatments/ Diseases:** There may also be limits applied on specific diseases and treatments/ procedures. Any expenses incurred beyond the limit specified by the insurer will have to be borne by you.
  
  ## 5️⃣ Maternity Health Insurance
  
  Parenthood brings a lot of joy and excitement to our lives, no doubt! But it also brings along a lot of added expenses. And, these expenses may not be covered under a regular health insurance policy. This is why it becomes crucial to invest in a maternity cover. 
  
  Some health plans come with an in-built maternity cover, whereas in others, the maternity cover is available as a separate rider or an add-on benefit. So, you’ll have to voluntarily opt for the maternity benefit by paying an additional premium. 
  
  The maternity benefit in health insurance covers the cost of both normal and caesarean delivery. And some insurers also cover prenatal, and post-natal costs, the cost of medicines, ultrasound, medical checkups, etc. And, the coverage is not just limited to the delivery of the baby. Some insurers may also cover the newborn baby for a set period of time.
  
  One important thing you must note about the maternity benefit is you won’t be able to make a claim immediately on buying the policy. There will be a specific waiting period that may range from 9 months to 4 years. You won’t be able to claim for any maternity-related expenses during this period.
  
  ## 6️⃣ Critical Illness Insurance
  
  A critical illness can happen to anyone at any stage of life. Serious illnesses like cancer, kidney failure, heart attack, etc. are commonplace now. And, these illnesses demand immediate medical attention. While on one side, they cause immense emotional trauma to the family, on the other - there is a certain financial impact due to expensive medical care.
  
  There is also a chance of you experiencing a sudden loss of income - you might either have to quit your current job or shift to a lower-paying job so you can prioritise your health. You will also start seeing a sudden increase in your healthcare expenses - medications, nursing and medical support, and other lifestyle alterations like installing a ramp for your wheelchair, and so on. Such expenses are not covered under a regular health insurance plan. 
  
  These costs will need to be borne by yourself - unless you have a critical illness insurance plan. Critical illness insurance can help you and your family deal with the financial impact of a serious disease. It pays a fixed sum of money if you're diagnosed with an illness that is covered in the policy. You and your family can use this money to deal with all the additional expenses that will have to be incurred because of the disease.
  
  ## 7️⃣ Group Health Insurance
  
  Group health insurance, as the name implies, is an insurance plan that covers a group of people. Generally, insurance companies offer group insurance coverages to a group with a common purpose. For instance, members of a club, employees of a company, account holders of a bank, registered users of a mobile app, and so on. 
  
  Group health covers require very less documentation, and are usually issued without any medical tests. So, these policies are relatively hassle-free to buy in comparison to retail, individual policies. 
  
  These plans, however, come with a lot of restrictions and are available only as long as you remain the member of the group (employer, club, bank, etc) Hence, in our opinion, you should consider buying a group health plan as a last resort - if you’re not getting an individual policy due to age or health-related issues. 
  
  
  ## 8️⃣ Topup &amp; Super Topup Plans
  
  Topup and Super Topup plans are like extensions to your base health insurance policy. Both these plans come with a ‘deductible’ - an amount after which the topup or the super topup will start to pay.
  
  A Topup plan’s deductible is calculated based on every single hospitalisation. So, it becomes active and starts paying only if the expenditure on one hospitalisation crosses the deductible limit. A Super Topup’s deductible, on the other hand, is calculated based on the sum total of all hospitalisation expenses incurred during the year. 
  
  Let’s try to understand how both Topups and Super Topups work with the help of Raj’s example.
  
  Two friends, Raj and Simran, are covered under health insurance policies of INR 10 Lakhs each. They both get diagnosed with cancer a few months after buying the policy. Raj buys a Topup of INR 20 Lakhs with a deductible limit of INR 10 Lakhs. And, Simran buys a Super Topup of INR 20 Lakhs with a deductible limit of INR 10 Lakhs.
  
  Now, let’s assume they both undergo hospitalisation at the same time and they incur similar hospitalisation expenses. Let’s understand how a Topup will pay in Raj’s case and how a Super Topup will pay in Simran’s case:
  
  1. **Hospitalisation**: 1st
  - **Claim Amount**: 6 Lakhs
  - **Topup**: Base plan will pay 6 Lakhs. 
  - **Super Topup**: Base plan will pay 6 Lakhs.
  
  2. **Hospitalisation**: 2nd 
    **Claim Amount**: 6 Lakhs
    **Topup**: Base plan will pay 4 Lakhs. Raj will have to pay 2 Lakhs out of his pocket. (Topup will not pay anything because the claim does not exceed the deductible limit, i.e., 10 Lakhs.)
    **Super Topup**: Base plan will pay 4 Lakhs. Super Topup will pay 2 Lakhs.
  
  3. **Hospitalisation**: 3rd 
    **Claim Amount**: 14 Lakhs
    **Topup**: Raj will have to pay 10 Lakhs out of his pocket. Topup will pay 4 Lakhs.
    **Super Topup**: Super Topup will pay 14 Lakhs.  
  `,
  `
  # Hospitalization expenses
A health insurance policy provides comprehensive coverage of hospitalization expenses. Here is a snapshot of the key expenses covered under a standard health insurance policy, of course, subject to terms and conditions.

## 1. Inpatient hospitalization
Health Insurance covers the room charges, ICU charges, the doctor fee, specialist or consultant fee, cost of surgery, oxygen, blood, etc. payable to the hospital.

All health insurance providers in India offer cashless treatment facilities at their network hospitals. You do not have to worry about arranging money to pay the hospital bills if you get admitted to a network hospital as it will be settled by your insurer under cashless claims.

## 2. Organ donor hospitalization
In the case of organ transplant, the costs of hospitalization and the donor's surgery are covered under most health insurance plans.

## 3. Hospitalisation at home
Many insurance plans even cover hospitalization at home. It covers hospitalization where a hospital cannot be used for treatment due to the following two reasons.

1. Non-availability of beds in the hospital
2. When the patient is so ill or injured that it is impossible to move him/her to the hospital for treatments

# Pre and post hospitalization expenses
Medical expenses like doctor consultations, medicines, and diagnostic tests incurred for the injury or illness before you are hospitalized are covered under health insurance. These are called pre-hospitalization expenses.

Similarly, after being discharged from the hospital, doctors recommend follow-up check-ups, consultations, medicines, etc. These costs are called post-hospitalization expenses.

The pre-hospitalization and post-hospitalization expenses are covered up to a fixed number of days as specified in the policy document.

# Pre-existing Diseases
The best health insurance policy also provides coverage for pre-existing diseases after you have completed the waiting period. Usually, pre-existing diseases are covered after a waiting period of 2 to 4 years.

"Pre-existing disease" is described as any condition, ailment, injury, or disease diagnosed or treated by a doctor 48 months prior to the date your health insurance cover starts.

As per the regulatory definition, any disease that was diagnosed more than 48 months before the insurance policy started (and cured!) cannot be considered as pre-existing disease, and hence cannot be excluded under the pre-existing disease clause. You need to be careful that insurers do not put such an exclusion in your policy. *For instance, if Mr. Khan, 35 years old had a history of Tuberculosis in his childhood which got cured before he became an adult. He has not undergone any treatment for Tuberculosis in the last 48 months. Now if he is buying a health insurance policy, Tuberculosis cannot be considered a pre-existing disease.*

## What are the additional clauses an insurer can put apart from the standard waiting period?

Insurers respond to your application, based on your declarations and the severity of your health condition. In case a chronic illness, health condition (obesity, etc.), or unhealthy lifestyle (excessive smoking, etc.) is reported, the insurer may put additional conditions on your policy.

**1. Increase premiums:** Insurers apply a loading (usually 10% to 50%) on the standard premiums, based on your declarations.

**2. Impose permanent exclusions:** Some pre-existing diseases are likely to have severe effects on health for a long time, and sometimes even have the risk of a relapse. Recently, IRDAI through its recent guidelines on standardizing health insurance has allowed insurers to apply a permanent exclusion for a list of diseases where insurers were earlier declining coverage altogether. This list includes - Cancer, Epilepsy, Heart Ailment, Stroke, Liver disease, Pancreas ailments, Bowel Disease, Kidney Disease, Hepatitis B, HIV, Alzheimer's.

**3. Impose restrictions:** In the case of certain chronic health conditions, the insurer could impose restrictions such as additional copay for every claim.

**4. Decline the policy:** Some pre-existing conditions might be too complex for the insurer to estimate risk on. In such cases, they can make a call to not insure the individual and decline the proposal.

# Others

## Ambulance Cost
It covers the cost of ambulance services availed to reach the nearest hospital during a medical emergency.

## Day Care Procedures 
It also covers the cost of availing day care treatment that requires hospitalization for less than 24 hours.

## AYUSH Treatment
It covers the cost of availing medical treatment through AYUSH school of medicines that includes Ayurveda, Unani, Homeopathy, Siddha and Yoga.

## Medical Check-ups
Most health insurance companies in india offer free preventive health check-up facilities to the insured at regular intervals depending on the policy terms and conditions.
  `,
  `
  # Introduction

The biggest surprise you can get at the time of a health insurance claim is to be told - *“your policy doesn’t cover this condition - you’ll have to pay for it!”* It’s easy to feel betrayed by the insurance company, when you suddenly learn about such ‘exclusions’ - after you’ve invested in that policy for many years. 

But - there’s an easy and sure-shot way to avoid such surprises. Educate yourself about everything that’s covered by your health insurance policy - and **more importantly, everything that isn’t.** 

So - here’s all you need to know about exclusions or situations that your insurer won’t pay for, in health insurance. 

# Permanent Exclusions in Health Insurance

Illnesses or conditions that your policy will never cover come under permanent exclusions - every policy will clearly list all such situations. You should go through this list in detail, before making the purchase. 

Permanent exclusions are of two types -

## 1️⃣ Standard permanent exclusions

The IRDAI has listed several exclusions. These are known as ‘standard permanent exclusions’ and must be imposed by every insurance company. In addition to these, these are also exclusions that insurers apply to most health insurance policies - which they mention in their policy wording. 

Here’s a list of top permanent exclusions you should watch out for - 

- **Investigation and evaluation:** Admission to a hospital only for observation or monitoring purposes. 
- **Rest cure, rehabilitation and respite care:** Expenses incurred for admission to any facility primarily for bed rest - where no active treatment is carried out.
- **Obesity / weight control:** Any treatment or surgery done for weight control or obesity. 
- **Change of gender treatment**: Treatment carried out to change the characteristcs of the body to those of the opposite sex.
- **Plastic/cosmetic surgery:** Any treatment/surgery carried out to alter body characteristics or your appearance. 
- **Profession in hazardous or adventure sport:** Any treatment expenses incurred while you’re working as a professional in adventure activities like river rafting, mountaineering, scuba diving, horse racing, etc. 
- **Breach of law:** Expenses incurred towards the treatment of a person who has committed or has attempted to commit a breach of law with criminal intent.
- **Excluded providers:** Getting treatment from a medical practitioner or in a hospital that is excluded by the insurance company. 
- **Unproven treatments:** Surgeries, medical procedures, or treatments undergone that are not proven to be effective.
- **Narcotics:** Any treatment conducted for addictive conditions like alcohol addiction, drug usage, etc.  
- **Maternity expenses**: Pre/post-natal costs, hospitalisation expenses incurred during childbirth, etc. 

## 2️⃣ Additional permanent exclusions 

An insurer may sometimes find it difficult to provide cover if you have a history of certain diseases. In such a case, the insurer will offer you health insurance cover only if you agree to permanently exclude those diseases.

For instance, you were diagnosed with an early-stage cancer when you were a kid which is now cured. The insurer learns about this from your medical history. Now, the insurer might still not cover cancer (even though it is cured) and will provide you cover only if you agree to have cancer as an exclusion to your policy. 

# Temporary Exclusions in Health Insurance

When you take a health insurance policy, you’ll not be able to make a claim for all the diseases/ conditions from day one. 

There will be some diseases that won’t be covered for a short period after the policy is issued. This period is called the ‘waiting period’. Once the waiting period is completed, these temporary exclusions are removed and you’ll be allowed to claim for these conditions as well. 

Temporary exclusions are put in a health insurance policy largely so that the policy remains viable and no frauds happen. Here’s a list of some common temporary exclusions that might be imposed right after your policy is issued - 

- **Initial waiting period:** All medical conditions except accidents are temporarily excluded for the first 30 days after the policy is issued. Meaning, you won’t be able to make a claim for any hospitalisation for 30 days - except in case of accidents. 
- **Pre-existing diseases waiting period:** A pre-existing condition is any medical condition or illness that you have had in the 48 months (4 years) before applying for the policy. There is a standard waiting period of 2-4 years for pre-existing conditions. The policy will not cover any expenses related to your pre-existing condition during this period. 
- **Specified disease/ procedure waiting period****:** Every insurer will provide a specific list of illnesses/ medical conditions (apart from your pre-existing diseases) that will have a waiting period of around 2-4 years. This waiting period will be applied regardless of whether or not you have had those diseases in the past. This is based entirely on the insurer and not on your health.
  `,
  `
  # 1️⃣ Adequate coverage for old age

Unless you’ve hidden under a shell all this time, you have heard horror stories of hospital bills reaching 15, even 20 lakhs for just a few days of Covid hospitalisations. And then, there’s the usual healthcare inflation itself. Rising at 8.87% as of December 2018, healthcare costs are further taking a boost under the pressure of the ongoing pandemic. 

Do you think the 5 lakh floater that ‘seemed adequate’ a few years back will cover any of your family’s needs, when an admission actually occurs? What about the future - say, 10-15 years down? We doubt that. Now combine all this with the fact that upgrades get difficult as you grow older, you might not be able to buy a larger enough cover after you develop a disease or make your first claim. 

If you don’t act now, and buy the highest cover you can afford, you are most likely ending up in soup - either not affording quality care for your family when they need it, or losing your life’s savings in the process. 

What can you do? We would say have at least a 20-30 lakh family floater, but if that is unaffordable at the moment - buy the highest cover you can afford. And over the next few years, increase it gradually. That’s the only way to ensure that you are protected now and in the future. 

# 2️⃣ No Room-rent limits or capping

If you have a health insurance plan with a low sum insured (say less than INR 5 Lakhs), the policy might come with a room-rent limit. Room-rent limits may be imposed either as a percentage of the sum insured (eg.: 1% of sum insured per day) or as a category of rooms (twin sharing room allowed). 

Why is this important? Room-rent limits restrict how you use your sum insured through proportionate deductions. For example, if you have a sum insured of INR 4 lakhs, and a room rent limit of 1% of sum insured, you will need to choose a room that costs less than INR 4000 per day to get a full coverage. If you pick a room that’s more expensive than your allowed limit, your insurer will not only deduct the additional room charges but also proportionately deduct all other hospitalization costs that are linked to the room you choose. 

If you check the room-rents across large hospitals across cities today, a single room’s cost could easily go beyond 6k-7k per day, reaching even 12k-13k per day in some cases. This is only rising. And the only way around it is to take a plan that doesn’t have a room-rent limit. 

That way, you’ll be able to make use of your large sum insured without being restricted on the comfort and convenience of which room you pick. 

# 3️⃣ Covers ‘all’ day care procedures

A Day Care Procedure is a medical procedure or surgery that previously required a prolonged hospital stay but with advanced medical science, can now be completed within 24 hours. Some examples are procedures such as dialysis, piles/fistula treatments, appendectomies and even chemotherapy - that can now be done without admitting you for a day!

Why is this important? As medical research improves the quality of care and reduces the need for prolonged hospitalisation, there will be more and more treatments that do not need you to get admitted to the hospital at all. You walk in, take your treatment and go back home the same day. In fact, such treatments also reduce the burden on the healthcare infrastructure as quicker (but effective) treatments will mean more people can get access. 

But - your policy might have limits on which day-care procedures are covered, and which not. Most insurers give you a ‘number’ of day care treatments covered in their policy, and this could be misleading For instance, one insurer might cover ‘ear surgery’, while another might cover ‘repairing a hole in the eardrum’ and ‘rectification of ear bone’ - just to increase the number of treatments. 

So, what can you do? To avoid any confusion, pick a policy which gives a blanket cover on all day care procedures, so even in the future any new additions to this list will be properly covered. 

# 4️⃣ Covers organ donor costs without limits

Radical advancements in the field of organ transplantations are offering us life-saving options in case of chronic organ failure. As these procedures gain traction and become more accessible across the world, the question will soon come down to affordability of such treatments. If you ever require an organ donation in the future, your insurance plan will cover the costs of surgery for you. 

But what about the donor who also undergoes a surgery, just to save your life? Costs involved will include organ screening expenses, pre-hospitalisation tests and consults, surgery costs, post-hospitalisation recovery costs and costs arising out of any complications post surgery. Technically, this amount could match up to the amount your surgery to receive the organ costs. And it will be your responsibility to bear. 

If you haven’t thought this through, you’ll end up not getting the life-saving transplant despite having a donor-match and having an insurance cover. (Or, lose all your savings covering such expenses).

The answer lies in an organ donor cover that can help you get the donor’s expenses as well covered. A number of health insurance companies in India have stepped up and now offer comprehensive plans which have an in-built cover for the hospitalization of the organ donor. 

Without this, you’ll have to bear the costs of these transplantation surgeries leaving your family financially exhausted, despite having health insurance cover. 

# 5️⃣ No co-pays

Many health insurance plans, especially those purchased for senior citizens, have a co-payment clause. This means that you’ll have to bear some portion of the hospital bill before the insurer pays the balance amount. 

For example, if your policy has a co-pay clause of 10% and your total hospital bill is Rs. 1 lakh, you’ll have to pay Rs. 10,000 out of your pocket and the insurer will cover the remaining Rs. 90,000. As costs of treatments rise by the year, it will slowly become unaffordable for your to foot such copayment costs. You’ll need to build a dedicated healthcare fund only to meet these costs - else this money will eat out of your savings.

So, try and purchase a policy that comes without any such clauses. Sometimes it might become impossible to get a policy without copay - either because you have a preexisting condition or are buying for a senior citizen - and every insurer is imposing this - buy the policy that has the lowest co-pay. 

# 6️⃣ No caps on treatment costs for specific conditions

Some policies come with limits on how much cover will be provided based on specific diseases or treatments. For example, there might be a limit that says - maximum 1 lakh cover for appendicitis surgery. So, what happens when you get admitted for an appendicitis surgery, but have a complication? You end up paying the rest of the money from your pocket, despite having a large sum insured. 

Insurers can include such restrictions in the fineprint - and you might not even notice this before signing the policy. In fact, you’ll most likely not notice this until you make a claim (and only a part of it gets paid). 

What can you do? Go back to the basics. Make yourself aware. Read the policy document in detail before agreeing to the terms and conditions and sealing the deal. Compare these fineprint details across plans before deciding which plan will help you the most. 

# 7️⃣ Restoration Benefit for related or unrelated conditions 

You might have an adequate sum insured to cover your family’s expected needs, but what happens if an unforeseen situation occurs and one particular incident results in a huge bill - taking up your entire sum insured? You will be left without a cover for any hospitalisations you might need in the same year. Further, if you’ve picked a floater - the rest of your family might be left without any cover. 

While this seems far-fetched, this has happened to several families in the last year, during Covid hospitalisations when multiple family members needed to be hospitalised - and once one of them exhausted the large floater amount, the rest were left without any cover. 

What’s the solution? Restoration benefit. With this benefit - your sum insured gets replenished, within the same year after you use it for a hospitalisation. It is like eating your cake, and having it too! While it sounds too good to be true, restoration benefit is a feature many health insurance plans today provide so that you have enough coverage despite exhausting your sum insured in treatments. 

Restoration benefits can be offered in both individual policies as well as floaters. In individual plans, if you use up a part of (or the entire) sum insured of one hospitalisation - the amount is restored, and you will be able to use the plan again for your next hospitalisation. In floaters, if one person of the family takes up a large chunk of the sum insured for a treatment, a restoration will ensure that the rest of the family is not left without sufficient cover. 

**Important points to note in a restoration benefit :** 

- Get a plan where this benefit is an inbuilt feature, and available in the base-policy itself, and not an add-on. As a result, you’ll not be paying an additional premium for this as an ‘optional cover’.
- While choosing a plan with this benefit, it is important to look for unlimited restoration (meaning the sum insured gets restored any number of times in a year) and where the benefit is part of the base cover itself (and not an ad-on).
- Some plans allow restoration only for unrelated conditions. For example, if you utilise your sum insured for a heart surgery - the sum insured will be restored, but cannot be used again for heart surgery. However, if you need an appendicitis surgery within the same year, you will have a cover. This condition limits you from getting covered, if you undergo repeated hospitalisations for the same conditions. To avoid this, try and find a plan that allows restoration for both related and unrelated conditions, so you’re adequately protected. 
- Look for a plan that replenishes the sum insured even after partial utilisation, so you get a full cover for every hospitalisation. 
- Get a plan where the restoration benefit is up to the Sum Insured (and not just the claim made). This will give you a larger cover for every hospitalisation. 

These seven features improve the quality of your health insurance plan providing you with adequate cover, minimum limits and utmost flexibility. Ensuring at least a majority of these features are included in your health insurance policy, will help you and your family get quality healthcare, whenever you need it - without having to worry about the financial burden.
  `,
  `
  # Introduction
Riders are extra coverage or benefits that a policyholder can buy over and above the base health insurance coverage on the payment of an additional premium. They help to enhance the scope of coverage of a health insurance policy by amending its existing terms and conditions. Riders enable the policyholder to obtain specific coverage that are otherwise missing from the base health policy, eliminating the need to buy another policy.

# Top Health Insurance Riders in India

## Room Rent Waiver Rider
The health insurance companies have a clause on the expenses of hospital room rent, commonly known as a sub-limit that is paid by the health insurance company. And in case the room rent expense exceeds the sub-limit, then the policyholder has to pay extra expenses from their own pocket. However, the Room Rent waiver rider helps in increasing or evading the sub-limit laid on the charges for the hospital room rent by the insurance.

**Who should buy it?**
This rider actually takes off the burden of room rent expense if it exceeds the sub-limit. This rider helps you in taking a room of your choice including private &amp; deluxe without paying any additional charges. Thus if the policy is taken for a senior citizen or a person dealing with a critical illness that may need hospitalization for a longer duration then they can think of buying this rider to completely remove the chance of pocket expense. Also, people who like their privacy can opt for this rider to select a private room of their choice without feeling its burden

## Hospital Daily Cash Rider
Hospitalisation means the patient can’t go to a job or business which leads to the loss of income. This additional rider provides a daily allowance to the policyholder during their stay in the hospital. There is some amount predefined by the insurance companies that the policyholder is liable to receive.*

**Who should buy it?**
Hospital Daily Cash rider is similar to the daily income that policyholder receives when he/she is unable to work and help their family financially. This rider helps the policyholder in running day-day expenses as an income replacement. People who depend on daily wages or are the sole breadwinner of the family can go for this rider so that their family doesn’t suffer when they are hospitalized.

## Consumable Cover Rider
This is a new age rider designed to meet the expenses of modern requirements of the treatment. This rider covers expenses of consumable items or only one-time use equipment such as gloves, PPE Kits, surgical items, etc that are generally not covered in the comprehensive health insurance plan.*

**Who should buy it?**
This rider has been designed in the wake of COVID19 where the need for consumable items increased drastically. Since such items are frequently required in the treatment and can lay a dent on the pocket of the insurance holder. Thus this rider helps in reducing the pocket expenses. People who are traveling for work or leisure and likely to get exposed to COVID19 infection can plan to buy this rider to save themselves from any kind of medical expense.

## NCB Protection Rider
Non-Claim Bonus (NCB) is a benefit given to the policyholder when no claim is raised any medical claim during the policy year, in the form of additional coverage or discount on premium or additional sum insured addition. If the policyholder makes the use of a health insurance claim then the nonclaim bonus becomes nullified. However, this Non-Claim Bonus Protection rider ensures that the policyholder gets the non-claim bonus even when the medical claim is raised by the policyholder. Who should buy it?*
NCB protection can be taken by a person who knows that he/she will have to claim because of their health conditions and they will have to forgo their bonus. However, with this rider, the person can enjoy the claim as well as the
bonus at the time of policy renewal.

## Inflation Rider
Inflation is inevitable that happens every year including in the medical field which means the charges for medical services go up with market inflation. The inflation in the medical field can make the treatment difficult for policyholders
to handle but this Inflation rider helps in managing funds for expensive treatments. This rider increases the sum insured amount on an annual basis with the Consumer Per Index Inflation Rate.

**Who should buy it?**
This rider helps policyholders in ensuring that their existing policy remains sufficient according to the rising inflation for the long term by automatically increasing the sum insured. With this rider, the policyholder doesn't
have to purchase new health insurance and get into the hassle of paperwork or medical check-up for a new plan with a higher sum insured. People having family floater health insurance plans can
leverage this rider to ensure that the sum insured amount is increased to meet the medical demands of the future.*

## Personal Accident Rider
Under this rider, a policyholder can protect himself/herself from accident-related mishap where the policyholder pays for the treatment of accident from own savings. The insurance rider pays a lump sum amount either to the policyholder
or the nominee that can be used by them either for medical treatment or for personal expenses in the case of loss of income.*

**Who should buy it?**
This rider provides extra coverage along with the health insurance plan. People having work or personal interests that involved traveling can definitely consider this rider to get some additional financial coverage in the form
of a lump-sum amount that can be used for their medical or non-medical purpose.*

## Critical Illness Rider
While a comprehensive health insurance plan helps in getting coverage for critical illness treatments but there are some sub-limits applied in the basic plan. Wherein, the critical illness rider provides additional coverage where the policyholders receive a lump sum amount on being diagnosed with some critical disease.*

**Who should buy it?**
As critical illnesses can be financially burdening and mentally depressing especially when the patient can’t really get on with their occupation and end up losing income. Thus this rider works like an income replacement as the
policyholder can use the money either for the treatment or for personal use. People who are likely to be affected with critical diseases either due to their family history with critical illnesses or due to their lifestyle can
opt for this rider.
  `,
  `
  # Pre-Existing Diseases
PED are diseases that a person has been diagnosed, treated or consulted for within 48 months before purchasing a health policy. It will be considered a pre-existing disease if you have high BP or thyroid.

The whole insurance sector work on risk assessment and probability. Naturally, people who already have some serious health concerns are more likely to face related health concerns later. The chances of raising claims thus increase for such people.

In such cases, no insurer would take a risk willingly. In fact, most insurers don’t provide any coverage for pre-existing illnesses. However, to provide much-needed financial safety they will increase the cost of premiums for people suffering from pre-existing diseases. Chances are, your insurer will ask you to purchase an add-on cover for pre-existing disease.

# Sum Insured
Each policy has a different sum insured. This is the maximum amount you can claim from your insurer in case of a health emergency. Suppose the SI of your policy is Rs. 5 lakhs. In case of an emergency, if your hospitalisation bill is 7 lakhs then you can only claim Rs. 5 lakhs.

The lower your SI is, the lower will be the premium. Health plans with a higher sum insured will cost more as you can claim much more from the insurer in case of a health emergency. It's always recommended to go for a higher sum insured as medical emergencies are unpredictable and you may end up paying out-of-pocket in case of something critical.

# High BMI
Body Mass Index or BMI is a common method to assess a person's fitness. A high BMI signifies a greater risk of facing health complications such as heart ailments, breathing issues, joint pains etc. If a customer has a high BMI, then they're seen as high-risk insurance purchasers who may develop health conditions sooner or later.

The good news is, several health insurance providers also offer discounts and rewards for maintaining an active lifestyle, obesity control and other general wellness programs to encourage policyholders to stay healthy.

# Age
There's a reason our 20s and 30s are called the golden years of our lives. This is the age we're at peak health and don't have any significant health concerns. However, after this, we start developing health concerns and our bodies struggle to bounce back as they used to.

If you buy health insurance early, it will cost less as there are fewer chances of your raising a claim. However, most insurers load the premium costs as you cross 45 years of age or more. In fact, most insurers don't issue plans to people above a certain age and roll out specific plans for seniors with higher premium costs.

# Smoking
Smoking is injurious to health and increases the risk of many health issues including lung issues, infertility, cancer etc. The chances of making a claim increase for smokers because of which insurers charge a higher premium for their health policies.

# Miscellaneous Factors
There are a lot of other factors that can affect your premium costs considerably. Make sure to focus on these factors before you buy any health plan.

**Profession**: Compared to regular office workers, those working at a factory or manufacturing unit may be required to pay a higher premium. Due to the higher risk of getting injured or sick, the insurer may increase their premium. Most insurers do not cover occupational hazards.
**Type of Plan**: Simple plans with few benefits will cost less premium, however comprehensive health insurance with extensive coverage or critical illness health plans will charge a higher premium.
**Gender**: Women and men have varying lifestyles and health issues to face. Some insurers may consider women as higher-risk policy buyers due to their health complications in later years. One such example is maternity expenses and other pregnancy-related claims that may be raised later.
**Add-ons**: Add-ons or optionals are extra benefits that you can use by paying an extra premium. They usually cover things that aren’t covered by regular health plans. The more add-ons you buy higher will be the premium.
**Location**: In India, different zones are distinguished based on geographic locations with varying elements like climate, pollution, quality of medical facilities etc. The premium will most likely be higher for Tier 1 cities as compared to Tier 2 and Tier 3 cities.
**Family Size**: Premium for individuals will be lesser for the same benefits as compared to a family floater. As the dependents increase on a plan, the health insurance premium will also increase.
  `,
  `
  # Introduction

You recently landed a new job that pays you well and comes with several perks. Once you accept the offer, you are informed that the company has tied up with a leading insurance provider for a health insurance cover for all employees - and you could get a great cover for a very affordable price.

You breathe a sigh of relief that you have free health insurance - and you don't have to spend time, money, or put yourself through the arduous task of finding and buying a personal health insurance plan! With this company health insurance, you are truly sorted - right?

**Wrong.** There are many situations where your corporate health insurance can fall short. And, when you or your family needs cover for hospitalisation, it might just be too late to go back and buy a personal insurance plan.

These situations are hard to imagine but occur more often than you'd think - giving us 3 reasons why you should not entirely rely on your corporate health insurance plan for your healthcare needs.

# How to use your company health insurance to your advantage?

There are only two specific situations in which it might be okay to take a corporate medical insurance plan.

1. **The company pays:** When it is provided by your company, with no additional cost to you. In this case, enjoy it while it lasts. As far as possible, use the corporate cover (instead of your personal cover) so you retain all your sum assured plus earn no claim bonuses where applicable.

2. **To cover short-term hospitalisation expenses:** When you buy a personal health insurance policy, there might be an initial window of time, where the insurer would not cover a list of diseases. Usually, the policy opens up and provides comprehensive cover gradually over 2-4 years. This period is called the waiting period - and it varies from insurer to insurer.   
    
A corporate health insurance plan in India may not have any waiting period or exclusions on pre-existing diseases. This is a very common argument, why people prefer company health insurance. So, on case you have a family member who has a pre-existing disease - let's say your parents, and you are being offered a company health insurance plan with pre-existing cover from Day 0, leverage that plan for the short term financial risk, while you stay invested in a personal plan for the long and very long term needs.

# Why would you need personal health plan along with company health plan?

- **It will discontinue as soon as you move from this company:** Your corporate health insurance policy is a group insurance policy tied to the company you are currently working with, and not to you specifically. This means that once you leave this job, you will be left without a cover. And should you choose to change your career path - decide to pursue higher studies or even join a budding startup, you might end up without health insurance. 
 
This is extremely risky - especially considering that you will be older by the time you decide to move jobs - which brings us to the next point…

- **You might not get the policy later:** As you grow older the risk of getting a lifestyle disease like diabetes or hypertension increases. Once you suffer from a chronic lifestyle disease, the insurer may hike premiums by 20-50% to cover the additional risk.
 
In addition to these premium hikes, there's always a risk that your proposal might be declined altogether, and you might not get a policy at all.

Imagine growing older, moving closer to your retirement date, and realising that you will not get a health insurance plan for an affordable cost anymore - so, you've to make the choice - of either going without a health cover or paying an unreasonable premium for a mediocre cover!

The best time to extract the best health insurance cover from an insurer is when you don't need it at all! When you are young and healthy  - **A corporate medical insurance policy is not personalised to your family's long-term medical needs:** An insurance cover is an extremely personal product that must be customised to your specific needs.
 
However, when a corporate policy is designed, it is done considering the budget limitations your company might allocate. As your company's HR tries to get the best possible deal for the employee group, at the least possible cost, you will end up with -

- A less than optimal cover, that won't provide adequate sum insured for all your family's health care expenses
- A 'one-size fits all' plan that won't be personalised to your needs and medical history.

You will have no control over the policy terms, features, or future negotiations - and this is by far the most important reason why you cannot rely entirely on your company health insurance.

As an alternative, for all your family members, especially your parents you should get a personal health insurance cover - with an adequate sum assured, as well as features and benefits that are tailored to your medical history and health requirements.
  `,
]

const guide = [
  {
    index: 1,
    title: "What is health insurance?",
    reference: reference[0],
  },
  {
    index: 2,
    title: "What is covered in health insurance?",
    reference: reference[1],
  },
  {
    index: 3,
    title: "What is not covered in health insurance?",
    reference: reference[2],
  },
  {
    index: 4,
    title: "What are the key factors to consider while buying health insurance?",
    reference: reference[3],
  },
  {
    index: 5,
    title: "What are health insurance riders?",
    reference: reference[4],
  },
  {
    index: 6,
    title: "Which Factors Affect Health Insurance Premium?",
    reference: reference[5],
  },
  {
    index: 7,
    title: "Should I buy additional insurance if I'm covered under employer group health?",
    reference: reference[6],
  },
];