import React, { useState } from "react";
import styles from "./signup.module.css";
import axios from "axios";
import HelmetComponent from "../../helmetComponent";

const Signup = (props) => {
  const signup_text = `
  제 1조 (목적)
본 약관은 ㈜모두락(이하 “회사”)가 운영하는 “또뷰(Ttoview)” 관련 제반 서비스의 이용과 관련하여 회사와 이용기관 및 개인과의 권리, 의무 및 책임사항, 기타 필요한 사항을 규정함을 목적으로 합니다.

제 2조 (용어의 정의)
본 약관에서 사용하는 용어의 정의는 다음과 같습니다.
1) “서비스”라 함은 ”회사”가 제공하는 “또뷰” 웹, 어플리케이션을 통하여 해당 웹, 어플리케이션이 가진 기능을 사용할 수 있도록 하는 제반 서비스를 의미합니다.
2) “고객”이라 함은 제3조 제1항에 따라 회원가입을 하여 “회사”가 제공하는 “서비스”를 받는 사업자와 그 구성원의 사용자 또는 개인 사용자를 의미합니다.
제 3조 (약관의 효력과 개정)
1) 본 약관은 “서비스”를 이용하기 위해 “고객”이 웹사이트 또는 모바일 앱에 접속하여 약관내용에 동의를 한 다음 회원가입신청을 하여 회사가 이를 승인함으로써 효력을 발휘합니다.
2) “회사”는 본 약관의 내용을 “고객”이 쉽게 알 수 있도록 서비스 초기화면에 게시합니다.
3) “회사”는 새로운 “서비스”의 적용, 보안체계의 향상 및 유지, 정부 등 공공기관에 의한 시정명령의 이행, “회사”가 제공하는 새로운 “서비스”의 적용, 기타 “회사”의 업무상 중대한 사유에 의하여 약관을 변경하여야 할 필요가 있다고 판단 될 경우 관계법령을 위반 하지 않는 범위 내에서 본 약관을 개정할 수 있습니다.
4) “회사”는 본 약관을 개정하는 경우, 개정 약관의 적용일자 및 개정사유를 명시하여 현행약관과 함께 “서비스”의 초기화면 에 게시하는 방법으로 “고객”이 사전에 인지할 수 있도록 약관적용 7일 전부터 적용 전일까지 공지합니다.
5) “고객”이 개정 약관의 적용에 동의하지 않는 경우, 개정 약관 적용 전일까지 “서비스” 회원에서 탈퇴할 수 있습니다. “고객”이 그러한 조치를 취하지 않은 경우 개정 약관의 적용에 동의한 것으로 봅니다.
6) “고객”이 책임질 수 없는 사정(개정 약관에 관한 공지 기간 동안 “서비스”에 접속하지 않았다는 사정은 ‘책임질 수 없는 사정’에 해당하지 않는 것으로 합니다.)으로 전항의 회원 탈퇴 조치를 취하지 못한 경우, 그러한 사정을 입증하여 ‘책임질 수 없는 사정’이 소멸한 즉시 회원 탈퇴 조치를 취할 수 있습니다.
제 4조 (개인정보의 보호)
“회사”는 관계법령이 정하는 바에 따라 “고객”의 개인정보를 보호하기 위해 노력합니다. 개인정보의 보호 및 이용에 대해서는 관련법령 및 “회사”의 개인정보취급방침이 적용됩니다.
제 5조 (고객정보의 변경)
1) “고객”은 개인정보관리화면을 통해서 언제든지 본인의 개인정보를 열람하고 수정할 수 있습니다.
2) “고객”은 회원가입 신청 시 기재한 정보가 변경되었을 경우 온라인으로 수정하여 그 변경사항을 “회사”에 알려야 합니다.
3) “고객”이 전 항의 내용을 이행하지 않아 발생한 불이익에 대하여 “회사”는 어떠한 책임도 부담하지 않습니다.
제 6조 (고객의 아이디 및 비밀번호 관리)
1) “고객”의 아이디와 비밀번호(이하 “식별수단”이하 함)에 관한 관리책임은 “고객”에게 있으며, 이를 제3자가 이용하도록 하여서는 안됩니다.
2) “고객”은 “식별수단”이 도용되어 제3자가 사용하고 있음을 인지한 경우에는 이를 즉시 “회사”에 통지하고 “회사”의 안내에 따라야 합니다.
3) 전 항의 규정에도 불구하고 해당 “고객”이 “회사”에 그 “식별수단”의 도용 사실을 통지하지 않거나, 통지한 후 “회사”의 안내에 따르지 않아 “고객”에게 발생한 불이익에 대하여 “회사”는 어떠한 책임도 부담하지 않습니다.
제 7조 (“서비스” 내용)
1) “회사”가 “고객”에게 제공하는 “서비스”는 다음과 같습니다
가. 제품 : “고객”이 구매한 “제품”를 NFC 기능을 통해 “회사”가 지정한 범위 내 용량에 한하여 저장하는 기능 및 페이지
나. 웹사이트 : “고객”이 이용하는 “웹”에 대한 실행, 관리 및 “고객”이 속한 사업장 또는 개인 프로필을 관리할 수 있는 온라인 상의 별도 페이지
다. “앱” : “회사”의 정책에 따라 기본제공 또는 “고객”의 선택에 따라 “또뷰”를 통해 무료 및 유료 결제의 방식으로 구매하여 이용하는 “서비스”
제 8조 (“서비스” 이용)
“고객”은 “회사”에서 정한 별도의 인증 방법을 통해 회원가입을 한 후 서비스를 무료 혹은 유료로 즉시 이용할 수 있습니다.
제 9조 (데이터 저장)
1) “서비스” 이용 시 클라우드 인프라를 기반으로 데이터를 저장합니다.
2) “고객”이 유료 및 무료 “서비스” 이용 시 정책에 따라 사용에 따른 데이터를 저장합니다.
3) “고객”이 “서비스”에 회원가입 시 사용하는 이용 버전에 따라서 기본 무료 용량을 제공하며, 기본 제공 용량 초과 시 “회사”가 정한 가격정책에 따라 추가 용량을 구매하는 시점부터 추가 제공됩니다.
제 10조 (데이터 보호 및 관리)
1) 데이터란 “고객”이 “앱”을 이용하여 입력 또는 생성 후 물리적인 데이터 서버에 저장된 자료입니다.
2) “회사”는 “고객”의 데이터를 보호하며 고객 데이터에 대한 허락 받지 않은 접근을 방지하기 위해 최소 업계 표준 시스템 및 절차를 구현합니다.
3) “회사”에 저장 된 데이터는 수사기관의 영장, 법원의 판결 또는 결정 등 정당한 법률적 절차가 개시 된 경우 별도의 “고객” 동의가 없는 경우라도 요청 기관에 “고객” 및 “고객”이 소속된 이용기관의 데이터를 제공하거나 공개 할 수 있습니다.
4) “회사”는 “회사”의 책임이 없는 사유로 인한 데이터 유실에 대해 책임지지 않습니다.
가. “고객”의 PC에서 다루는 제3자 제공 프로그램의 종료 및 오류로 인하여, 파일이 손상되었거나 서버에 업로드 된 파일이 잘못 저장된 경우
나. “고객”의 PC혹은 스마트폰 등에서 업로드 시 사용한 네트워크 연결상태 및 네트워크 환경 상의 장애 및 오류 등으로 인하여 정상적으로 파일이 업로드 되지 않은 경우
다. “고객”의 PC/네트워크 등 환경 문제, 아이디/비밀번호 분실 및 도용, 관리소홀 등 사용자 책임이 있는 경우
라. 천재지변, 국가비상사태 또는 이에 준하는 불가항력적인 사유로 인한 서버파일 손상이 있는 경우
마. 기타 위 사례를 포함하여, “회사”의 책임이 없는 사유로 판단 될 수 있는 경우
5) 유실 된 데이터는 복구가 불가능하니 데이터는 “고객”이 별도로 보관하여야 합니다.
6) 저장된 데이터가 서버의 업그레이드, 시스템 점검, 데이터 마이그레이션 등 기타 통상적인 서비스의 유지 운영의 행위 도중, “회사”의 귀책 사유로 데이터의 유실 또는 손상이 발생하였고 그로 인하여 “고객”이 손해를 입은 경우, “회사”는 “고객”이 입증한 손해를 배상하되 손해배상액은 최근 12개월 동안 “고객”이 “회사”에 지불한 서비스 이용요금을 한도로 합니다.
제 11조 (“서비스” 알림 제공)
“회사”는 “고객”의 원활한 “서비스” 제공을 위해 “이메일” 또는 “서비스 내 공지사항” 서비스를 통해서 알림을 제공합니다.
제 12조 (“서비스” 탈퇴 또는 중지)
1) “고객”이 “서비스”를 해지하고자 하는 때에는 “고객” 본인이 “서비스”의 탈퇴기능을 통하여 탈퇴할 수 있습니다.
2) 유료 서비스의 경우 “고객”이 “서비스”를 해지하고자 하는 때에는 “회사”측에 문의절차를 통해서 알리고 “회사”가 해지과정을 진행합니다.
3) 탈퇴 신청의 처리 여부는 “고객”이 “식별수단”을 사용하여 로그인을 시도하여 로그인이 되지 않음을 확인함으로써 알 수 있습니다.
4) “고객”이 “서비스”를 해지할 경우, 관련법령 및 개인정보취급방침에 따라 “회사”가 회원정보를 보유하는 경우를 제외하고는 해지 즉시 “고객”의 모든 데이터는 소멸됩니다. 다만, 엔터프라이즈 버전의 “서비스”에 “고객”이 등록한 연락처 정보는 “사업자” 단위의 업무 관련 연락처 관리 서비스로써 “고객”이 “서비스”를 해지하여도 “고객”이 소속된 “사업자”의 정보로 관리되어 소멸되지 않습니다.
5) “회사”는 “고객”이 본 약관에서 정한 의무를 위반할 경우 서면, 이메일, 전화, 기타 방법을 통하여 그 시정 또는 개선을 요구할 수 있고, 귀책 당사자의 시정 또는 개선 조치가 없을 경우 서면, 이메일, 전화, 기타 방법을 통하여 통지한 후 “서비스”의 제공을 중지할 수 있습니다.
6) “회사”는 “고객”에게 다음 어느 하나에 해당하는 상황이 발생 할 경우 사전 통보 없이 “서비스”의 제공을 중지할 수 있습니다.
가. 금융기관의 지급거절, 해산, 회사정리, 파산 등의 절차가 개시되거나 이와 유사한 상황이 발생한 경우
나. 주요 자산 또는 영업을 제3자에게 양도한 경우
다. 중대한 법령 위반 또는 사회적 물의로 인하여 “서비스” 운영에 막대한 지장을 초래하였거나 초래할 것이 합리적으로 예상되는 경우
라. 가압류, 가처분, 압류, 공매 경매 개시 등의 절차에 들어갔거나 들어갈 염려가 있다고 인정 될 때
마. 타인의 명의를 도용하거나 허위 사실로 신청이 확인된 경우
바. 기타 정상적인 “서비스”운영에 방해가 된다고 “회사”가 판단한 경우
제 13조 (“서비스” 제공 및 변경)
1) “서비스”는 연중무휴, 1일 24시간 제공함을 원칙으로 합니다.
2) “회사”는 컴퓨터 등 정보통신설비의 보수점검, 노후 및 고장에 의한 교체, 통신망의 두절 또는 기타 운영상 상당한 이유가 있는 경우 “서비스”의 제공을 일시적으로 중단할 수 있습니다. 단, “회사”는 “회원”에게 사전 통지 또는 공지함을 원칙으로 하며, 부득이한 경우에는 사후 통지 할 수 있습니다.
3) “회사”는 “서비스”의 일부 또는 전부를 “회사”의 정책 및 운영상, 기술상의 필요에 따라 변경할 수 있습니다. 단, “서비스”의 내용, 이용방법, 이용시간 등 “서비스”의 일부 또는 전부의 변경이 있는 경우에는 변경사유, 변경 될 “서비스”의 내용 및 제공일자를 7일 전 “서비스”의 제공화면에 게시하여야 합니다.
제 14조 (“서비스” 요금 및 결제)
1) “회사”는 “서비스”에서 “고객”이 유료 서비스를 구매하여 이용하는 경우 각 버전의 가격 정책에 따라 월 혹은 연간 단위로 각 유료 서비스 요금을 합산하여 청구할 수 있습니다.
2) “고객”은 “서비스”에서 이용 중인 유료 서비스의 가격정책에 따라 매월 요금을 결제해야 합니다.
3) 연간 과금으로 결제 시, 계약 기간 중 서비스 탈퇴 시 위약금이 발생합니다. 위약금은 "월간요금제 대비 할인받은 금액 + 남은 기간 동안 지불할 금액의 10%"이며, 위약금에는 Tax가 부과되지 않습니다.
4) 월간요금제 대비 할인받은 금액은 연간 계약시 체결한 월 청구금액 기준으로 계산되며, 남은기간 동안 지불할 금액의 10%는 서비스 탈퇴 신청일로부터 이전 30일동안 최대 사용인원 기준으로 계산됩니다.
5) 위약금 계산 공식은 아래와 같습니다. 
(1) 월간 요금제 대비 할인받은 금액 = {사용기간 월 X (월간요금제월요금 - 연간요금제월요금)}
(2) 남은 기간 동안 지불할 금액의 10% = {월 계약금액 X (총계약기간 월-사용기간 월)+(추가사용인원 사용금액)} X 10%
(3) 위약금 = (1) + (2) 
6) “엔터프라이즈” 요금제의 경우 정해진 요금제를 따르는 것이 아니라, “상담 및 견적요청”에 의거한 “견적서”와 정식 “계약문서”에 의해서 결정됩니다.
7) “고객”은 미납액이 발생하는 경우 납부의 의무가 있으며 미납이 30일 이상 지속될 경우 서비스에 제한이 있을 수 있습니다. 미납액에 대한 포기 및 취소는 가능하지 않으며, 이용료 지불에 대한 납세의 책임 또한 “고객”에게 있습니다.
8) “서비스”에서 제공하는 청구 및 결제 방식은 “회사”의 정책을 따릅니다.
제 15조 (회사의 의무)
1) “회사”는 특별한 사정이 없는 한 “회사”가 제공하는 “서비스”를 계속적이고 안정적으로 제공하기 위하여 최선을 다하여 노력합니다. 
2) “회사”는 “서비스”의 제공설비를 항상 운용 가능한 상태로 유지보수하며, 설비에 장애가 발생하거나 멸실 된 경우 지체 없이 이를 수리 복구할 수 있도록 최선을 다하여 노력합니다. 
3) “회사”는 “고객”으로부터 제기되는 의견이나 불만이 정당한 것으로 인정될 경우 신속히 처리하여야 합니다. 다만, 신속한 처리가 곤란한 경우 “고객”에게 그 사유와 처리 일정을 이메일, 서면 또는 전화 등의 방법으로 통지합니다. 
제 16조 (고객의 의무)
1) “고객”은 본 약관 및 관계 법령을 준수하여야 하며, 기타 회사의 업무 수행에 지장을 초래하는 행위를 하여서는 안됩니다.
2) “고객”은 본 약관 이외의 이용하는 “서비스”와 관련하여 “회사”가 통지하는 사항을 준수하여야 합니다. 
3) “고객”은 다음 각 호에 해당하는 행위를 하여서는 안됩니다. 
가. 신청 및 등록 또는 변경 시 허위 내용의 등록 
나. 타인의 정보 도용 
다. “회사” 또는 제3자의 지식재산권에 대한 침해 
라. “회사” 또는 제3자의 명예 훼손 및 업무방해 
마. 음란한 부호, 문자, 음향, 화상, 영상, 기타 공서양속에 반하는 정보의 공개 또는 게시 
바. “회사”의 동의 없는 영리 목적의 “서비스” 이용 
사. 기타 불법하고 부당한 행위 
제 17조 (손해배상 등)
1) “회사” 또는 “고객”은 어느 일방이 본 약관에서 정한 의무를 위반함에 따라 상대방에게 손해가 발생한 경우 귀책당사자에게 손해배상을 청구할 수 있습니다. (회사의 책임을 회사의 고의 도는 중대한 과실에 기인한 것이 아닌 한 일정 한도로 제한할 필요가 있습니다.)
2) 본 약관에서 정한 의무 위반 등으로 인하여 제3자와의 사이에 분쟁 발생 시 일방 당사자는 자신의 책임과 비용으로 상대방을 면책시키고, 그로 인한 상대방의 모든 손해를 배상하여야 합니다
제 18조 (면책조항)
1) “회사”는 전시, 사변 등 국가비상사태, 천재지변, 기간통신사업자의 서비스제공 중단, 한전으로부터의 전력공급 중단, 해커의 침입, 컴퓨터 바이러스, 기타 이와 유사한 사정으로 인한 서비스 시스템의 작동불능 등 불가항력으로 인하여 “서비스”를 제공할 수 없는 경우 “회사”는 제공하는 “서비스”의 이용과 관련하여 어떠한 책임도 부담하지 않습니다.
2) “회사”는 “고객”의 귀책사유로 인하여 발생하는 손해에 대하여 “회사”는 어떠한 책임도 부담하지 않습니다.
3) “회사”는 “고객” 상호간, “고객”과 제휴사 또는 제3자 상호간에 “서비스”를 매개로 발생한 분쟁에 대해서는 개입할 의무가 없으며 이로 인한 손해를 배상할 책임이 없습니다.
제 19조 (지식재산권 등)
1) 본 약관을 통해 “회사”는 “고객”에게 “서비스”에 대한 사용권만을 부여하며, “회사”가 작성하여 제공하는 “서비스”에 관한 소유권 및 지식재산권은 “회사”에 귀속됩니다. 단, “서비스” 중 “회사”와 제휴를 통해 제휴사가 제공하는 “서비스”에 대한 소유권 및 지식재산권은 제휴사에 귀속됩니다.
2) “고객”은 “회사”가 제공하는 “서비스”를 “회사”의 사전 동의 없이 영리 목적으로 복제, 전송, 출판, 배포, 방송, 기타 방법에 의하여 이용하거나 제3자에게 이용하게 하여서는 안됩니다.
3) “고객”이 “서비스”에 게재한 게시물, 자료에 관한 권리와 책임은 게시한 “고객”에게 있습니다. “회사”는 “고객”이 게재한 게시물, 자료에 대하여 “서비스” 내의 게재권을 가지며, 게재한 “고객”의 동의 없이 이를 영리적인 목적으로 사용하지 않습니다.
4) “회사”는 제16조의 의무를 위반하는 내용을 담고 있는 게시물에 대하여 수정 또는 삭제할 권한을 갖습니다.
제 20조 (분쟁해결 및 관할법원)
1) “회사”와 “고객”은 “서비스”와 관련하여 발생한 분쟁을 원만하게 해결하기 위하여 필요한 모든 노력을 하여야 합니다.
2) “서비스” 이용에 관해 발생한 분쟁이 원만하게 해결되지 아니한 경우 관련 소송의 관할은 “회사” 본점 소재지를 관할하는 법원으로 합니다.
제 21조 (기타)
본 약관에서 정하지 않은 사항 및 내용 해석상의 이견이 있을 경우에는 일반상관습에 따르기로 합니다.

[부칙]
본 약관은 2021년 12월 1일부터 시행합니다. 



  `;

  const signup_text_two = `
  1. 개인정보 처리 목적

모두락의 본 개발자가 작성한 앱은 일체의 개인정보를 수집, 처리하고 있지 않습니다.

​1) 무료 앱에서 UnityAds 광고 라이브러리(Google Play Lib)가 필요로 하는 권한 위임을 위해 사용

- 자체광고를 포함하고 있지 않습니다.

​

2. 개인정보처리 위탁 여부

모두락의 본 개발자의 앱은 타 업체에 개인정보처리를 위탁하지 않습니다.

​

3. 정보주체의 권리,의무 및 그 행사방법

이용자는 개인정보주체로서 언제든지 개인정보 보호 관련 권리를 행사할 수 있습니다.

다만, 본 앱은 앱 사용자의 사용정보를 수집 및 보유하지 않습니다.

​

4. 처리하는 개인정보의 항목 작성

모두락은 앱에서 회원가입, 로그인, 위치정보 등을 요구하지 않아 개인정보를 수집하지 않습니다. 또한 앱사용 중 데이터통신을 하지않습니다.

​

5. 개인정보의 파기

모두락은 앱 사용자의 사용정보를 수집 및 보유하지 않습니다. 따라서 파기해야하는 개인정보를 가지고 있지 않습니다.

​

6. 개인정보의 안전성 확보 조치

모두락은 앱 사용자의 사용정보를 수집 및 보유하지 않습니다.

​

>>개인정보 보호책임자

연락처 : jurngjk98@naver.com

  `;

  const [topPopupOn, setTopPopupOn] = useState(false);
  const [bottomPopupOn, setBottomPopupOn] = useState(false);
  const [checkedId, setCheckedId] = useState(null);
  const [checkedPhone, setCheckedPhone] = useState(null);
  const [disable, setDisable] = useState(false);
  const [checkValues, setCheckValues] = useState({
    signupAgree: false,
    infoCollectionAgree: false,
  });

  const [inputValues, setInputValues] = useState({
    id: "",
    pw: "",
    pwConfirm: "",
    name: "",
    phone: "",
    authNum: "",
  });

  const { id, pw, pwConfirm, name, phone, authNum } = inputValues;

  const { signupAgree, infoCollectionAgree } = checkValues;

  const inputValueChangeHandler = (e) => {
    const { name, value } = e.target;
    setInputValues({
      ...inputValues,
      [name]: value,
    });
  };

  const checkValueChangeHandler = (e) => {
    const { name, checked } = e.target;
    setCheckValues({
      ...checkValues,
      [name]: checked,
    });
  };

  const idDupCheckHandler = () => {
    if (id.length < 4 || id.length > 12) {
      window.alert("아이디는 4~12자리로 입력해주세요");
      return;
    }
    axios
      .post(`${process.env.REACT_APP_BASEURL}/user/useridvalid`, {
        id,
      })
      .then((response) => {
        if (response.data === "OK") {
          window.alert("사용 가능한 아이디입니다.");
          setCheckedId(id);
          return;
        }
        window.alert("이미 사용중인 아이디입니다.");
      })
      .catch((err) => console.error(err));
  };

  const allAgreeHandler = (e) => {
    if (e.target.checked) {
      setCheckValues({
        signupAgree: true,
        infoCollectionAgree: true,
      });
    } else {
      setCheckValues({
        signupAgree: false,
        infoCollectionAgree: false,
      });
    }
  };

  const sendSmsHandler = () => {
    if (phone === "") {
      window.alert("핸드폰 번호를 먼저 입력해주세요");
      return;
    }
    if (phone.length !== 11) {
      window.alert("핸드폰 번호를 다시 확인해주세요");
      return;
    }
    for (let i = 0; i < phone.length; i++) {
      if (isNaN(parseInt(phone.charAt(i)))) {
        window.alert("숫자만 입력해주세요");
        return;
      }
    }
    axios
      .post(`${process.env.REACT_APP_BASEURL}/user/userphonevalid`, {
        phone,
      })
      .then((response) => {
        if (response.data !== "OK") {
          window.alert("이미 사용중인 핸드폰 번호입니다.");
          return;
        }
        axios
          .post(`${process.env.REACT_APP_BASEURL}/user/requestsms`, {
            phone,
          })
          .then((response) => window.alert("인증번호가 발송되었습니다."))
          .catch((err) => console.error(err));
      })
      .catch((err) => console.error(err));
  };

  const authNumCheckHandler = () => {
    axios
      .post(`${process.env.REACT_APP_BASEURL}/user/checksms`, {
        to: phone,
        content: authNum,
      })
      .then((response) => {
        if (response.data === "success") {
          window.alert("인증이 완료되었습니다.");
          setCheckedPhone(phone);
          setDisable(true);
          return;
        }
        window.alert("인증번호가 다릅니다.");
      });
  };

  const signupSubmitHandler = (e) => {
    e.preventDefault();

    if (!(signupAgree && infoCollectionAgree)) {
      window.alert("약관에 모두 동의하셔야 가입이 가능합니다.");
      return;
    }

    if (
      id.length === 0 ||
      pw.length === 0 ||
      name.length === 0 ||
      phone.length === 0
    ) {
      window.alert("입력되지 않은 정보가 있습니다. 다시 확인해주세요.");
      return;
    }

    if (pw !== pwConfirm) {
      window.alert("비밀번호와 비밀번호 확인이 동일하지 않습니다.");
      return;
    }

    if (pw.length < 8 || pw.length > 16) {
      window.alert("비밀번호는 8~16자리여야 합니다.");
    }

    if (!checkedId) {
      window.alert("아이디 중복확인이 완료되지 않았습니다.");
    }

    if (!checkedPhone) {
      window.alert("핸드폰 인증이 완료되지 않았습니다.");
      return;
    }

    axios
      .post(`${process.env.REACT_APP_BASEURL}/user/register`, {
        id: checkedId,
        password: pw,
        name,
        phone: checkedPhone,
      })
      .then((response) => {
        const resData = response.data;
        if (resData === "success") {
          window.alert("회원가입이 완료되었습니다.");
          window.location.href = "/modoorock";
        }
      })
      .catch((error) => console.error(error));
  };

  const closePopupHandler = () => {
    setTopPopupOn(false);
    setBottomPopupOn(false);
  };
  return (
    <section className={styles.signup}>
      <HelmetComponent
        title="회원가입"
        desc="모두락의 회원이 되어 다양한 액티비티 미션투어 체험 상품을 경험해보세요"
        url="https://web.modoorock.com/modoorock/signup"
      />
      <form className={styles.signup_form}>
        <div className={styles.signup_title_container}>
          <h1 className={styles.signup_title}>모두락 회원가입</h1>
        </div>

        <section className={styles.input_part}>
          <div className={styles.input_container}>
            <p className={styles.input_title}>아이디</p>
            <input
              name="id"
              onChange={inputValueChangeHandler}
              value={id}
              type="id"
              className={`${styles.input} ${styles.phone_num_input}`}
              placeholder="아이디 (4~12자)"
              spellCheck="false"
            />
            <button
              type="button"
              className={styles.get_auth_num_button}
              onClick={idDupCheckHandler}
            >
              중복확인
            </button>
          </div>
          <div className={styles.input_container}>
            <p className={styles.input_title}>비밀번호</p>
            <input
              name="pw"
              onChange={inputValueChangeHandler}
              value={pw}
              type="password"
              className={`${styles.input} ${styles.password_input}`}
              placeholder="비밀번호 (8~16자)"
              spellCheck="false"
            />
          </div>
          <div className={styles.input_container}>
            <p className={styles.input_title}>비밀번호 확인</p>
            <input
              name="pwConfirm"
              onChange={inputValueChangeHandler}
              value={pwConfirm}
              type="password"
              className={`${styles.input} ${styles.password_confirm_input}`}
              placeholder="비밀번호 확인"
              spellCheck="false"
            />
          </div>
          <div className={styles.input_container}>
            <p className={styles.input_title}>이름</p>
            <input
              name="name"
              onChange={inputValueChangeHandler}
              value={name}
              type="text"
              className={`${styles.input} ${styles.name_input}`}
              placeholder="이름"
              spellCheck="false"
            />
          </div>

          <div className={styles.input_container}>
            <p className={styles.input_title}>핸드폰 번호</p>
            <input
              name="phone"
              onChange={inputValueChangeHandler}
              value={phone}
              type="text"
              className={`${styles.input} ${styles.phone_num_input}`}
              placeholder="핸드폰 번호"
              spellCheck="false"
              disabled={disable}
            />
            <button
              type="button"
              className={styles.get_auth_num_button}
              onClick={sendSmsHandler}
            >
              인증번호 받기
            </button>
          </div>
          <div className={styles.input_container}>
            <p className={styles.input_title}>인증번호</p>
            <input
              name="authNum"
              onChange={inputValueChangeHandler}
              value={authNum}
              type="text"
              className={`${styles.input} ${styles.phone_num_input}`}
              placeholder="인증번호"
              spellCheck="false"
              disabled={disable}
            />
            <button
              type="button"
              className={styles.get_auth_num_button}
              onClick={authNumCheckHandler}
            >
              인증번호 확인
            </button>
          </div>
        </section>
        <section className={styles.agree_part}>
          <div className={styles.all_agree}>
            <input
              type="checkbox"
              className={styles.agree_input}
              onChange={allAgreeHandler}
            />
            <span className={styles.all_agree_desc}>전체 약관 동의</span>
          </div>
          <div className={styles.separate_agree_container}>
            <div
              className={`${styles.separate_agree} ${styles.separate_agree_top}`}
            >
              <input
                name="signupAgree"
                onChange={checkValueChangeHandler}
                value={signupAgree}
                type="checkbox"
                checked={signupAgree}
                className={styles.agree_input}
              />
              <span className={styles.agree_desc}>
                회원 가입 및 이용약관 동의 (필수)
              </span>
              <div
                onClick={() => setTopPopupOn(true)}
                className={styles.icon_container}
              >
                <i className={`${styles.icon} fas fa-chevron-right`}></i>
              </div>
            </div>
            <div
              className={`${styles.separate_agree} ${styles.separate_agree_bottom}`}
            >
              <input
                name="infoCollectionAgree"
                onChange={checkValueChangeHandler}
                value={infoCollectionAgree}
                type="checkbox"
                checked={infoCollectionAgree}
                className={styles.agree_input}
              />
              <span className={styles.agree_desc}>
                개인정보 수집 및 이용 (필수)
              </span>
              <div
                onClick={() => setBottomPopupOn(true)}
                className={styles.icon_container}
              >
                <i className={`${styles.icon} fas fa-chevron-right`}></i>
              </div>
            </div>
          </div>
        </section>
        <button className={styles.submit_button} onClick={signupSubmitHandler}>
          회원가입
        </button>
      </form>
      {topPopupOn && (
        <div className={styles.filter}>
          <div className={styles.signup_popup}>
            <div onClick={closePopupHandler}>
              <i className={`${styles.close_icon} fas fa-times`}></i>
            </div>
            <h3 className={styles.popup_title}>모두락 이용약관</h3>
            <div className={styles.signup_popup_container}>
              <p className={styles.signup_popup_text}>{signup_text}</p>
            </div>
          </div>
        </div>
      )}
      {bottomPopupOn && (
        <div className={styles.filter}>
          <div className={styles.signup_popup}>
            <div onClick={closePopupHandler}>
              <i className={`${styles.close_icon} fas fa-times`}></i>
            </div>
            <h3 className={styles.popup_title}>개인정보 수집 및 이용 약관</h3>
            <div className={styles.signup_popup_container}>
              <p className={styles.signup_popup_text}>{signup_text_two}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Signup;
