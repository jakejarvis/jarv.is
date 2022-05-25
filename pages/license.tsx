import { NextSeo } from "next-seo";
import Content from "../components/Content";
import PageTitle from "../components/PageTitle";
import Link from "../components/Link";
import HorizontalRule from "../components/HorizontalRule";
import Blockquote from "../components/Blockquote";
import { H2, H3 } from "../components/Heading";
import { UnorderedList, OrderedList, ListItem } from "../components/List";

const License = () => {
  return (
    <>
      <NextSeo
        title="License"
        openGraph={{
          title: "License",
        }}
      />

      <PageTitle>📜 License</PageTitle>

      <Content>
        <p>
          Unless otherwise noted, content on this website is published under the{" "}
          <Link href="https://creativecommons.org/licenses/by/4.0/">
            <strong>Creative Commons Attribution 4.0 International Public License</strong>
          </Link>{" "}
          (CC-BY-4.0), which means that you can copy, redistribute, remix, transform, and build upon the content for any
          purpose as long as you give appropriate credit (such as a hyperlink to the original URL).
        </p>
        <p>
          The <Link href="https://creativecommons.org/licenses/by/4.0/legalcode">full license</Link> is re-printed
          below.
        </p>

        <HorizontalRule />

        <H2 id="full-text">Creative Commons Attribution 4.0 International Public License</H2>

        <p style={{ textAlign: "center", lineHeight: 0 }}>
          <Link
            href="https://creativecommons.org/licenses/by/4.0/"
            title="Creative Commons Attribution 4.0"
            underline={false}
          >
            <svg width="120" height="42">
              <path d="M3.1.5l113.4.2c1.6 0 3-.2 3 3.2l-.1 37.3H.3V3.7C.3 2.1.4.5 3 .5z" fill="#aab2ab"></path>
              <path d="M117.8 0H2.2C1 0 0 1 0 2.2v39.3c0 .3.2.5.5.5h119c.3 0 .5-.2.5-.5V2.2c0-1.2-1-2.2-2.2-2.2zM2.2 1h115.6c.6 0 1.2.6 1.2 1.2v27.3H36.2a17.8 17.8 0 01-31.1 0H1V2.2C1 1.6 1.5 1 2.1 1z"></path>
              <path
                d="M73.8 32.7l.9.1.6.3.5.5.1.8c0 .3 0 .6-.2.8l-.7.6c.4 0 .7.3 1 .6l.2 1-.1 1-.6.5-.7.4H70.7v-6.6h3.1zm-.2 2.7c.3 0 .5 0 .7-.2l.2-.6v-.3l-.3-.3H74l-.4-.1h-1.4v1.5h1.5zm.1 2.8h.4l.4-.1.2-.3v-.4c0-.4 0-.6-.2-.8l-.8-.2h-1.6v1.8h1.6zM76.5 32.7h1.6l1.6 2.7 1.5-2.7H83l-2.5 4.1v2.6h-1.5v-2.6l-2.4-4zM34.3 19.6a13.6 13.6 0 01-27.3 0 13.6 13.6 0 0127.3 0z"
                fill="#fff"
              ></path>
              <path d="M31.7 8.5c3 3 4.5 6.7 4.5 11.1a15.4 15.4 0 01-15.6 15.6 15 15 0 01-11-4.6 15 15 0 01-4.6-11c0-4.3 1.5-8 4.6-11.1 3-3 6.7-4.5 11-4.5 4.4 0 8 1.5 11.1 4.5zm-20 2a12.5 12.5 0 00-3.9 9.1c0 3.5 1.3 6.5 3.8 9s5.6 3.8 9 3.8c3.5 0 6.6-1.3 9.2-3.8a12 12 0 003.6-9c0-3.6-1.2-6.6-3.7-9a12.3 12.3 0 00-9-3.8c-3.6 0-6.6 1.2-9 3.7zm6.7 7.6c-.4-.9-1-1.3-1.8-1.3-1.4 0-2 1-2 2.8 0 1.8.6 2.8 2 2.8 1 0 1.6-.5 2-1.4l1.9 1a4.4 4.4 0 01-4.1 2.5c-1.4 0-2.5-.5-3.4-1.3-.8-.9-1.3-2-1.3-3.6 0-1.5.5-2.7 1.3-3.5 1-1 2-1.3 3.3-1.3 2 0 3.3.7 4.1 2.2l-2 1zm9 0c-.4-.9-1-1.3-1.8-1.3-1.4 0-2 1-2 2.8 0 1.8.6 2.8 2 2.8 1 0 1.6-.5 2-1.4l2 1a4.4 4.4 0 01-4.2 2.5c-1.4 0-2.5-.5-3.3-1.3-.9-.9-1.3-2-1.3-3.6 0-1.5.4-2.7 1.3-3.5.8-1 2-1.3 3.2-1.3 2 0 3.3.7 4.2 2.2l-2.1 1z"></path>
              <g transform="matrix(.99377 0 0 .99367 -177.7 0)">
                <circle cx="255.6" cy="15.3" r="10.8" fill="#fff"></circle>
                <path d="M258.7 12.2c0-.4-.4-.8-.8-.8h-4.7c-.5 0-.8.4-.8.8V17h1.3v5.6h3.6V17h1.4v-4.8z"></path>
                <circle cx="255.5" cy="9.2" r="1.6"></circle>
                <path
                  clipRule="evenodd"
                  d="M255.5 3.4c-3.2 0-6 1.1-8.2 3.4A11.4 11.4 0 00244 15c0 3.2 1.1 6 3.4 8.2 2.3 2.3 5 3.4 8.2 3.4 3.2 0 6-1.1 8.4-3.4a11 11 0 003.3-8.2c0-3.3-1.1-6-3.4-8.3-2.2-2.3-5-3.4-8.3-3.4zm0 2.1c2.7 0 5 1 6.8 2.8a9.2 9.2 0 012.8 6.8c0 2.7-1 4.9-2.7 6.7-2 1.9-4.2 2.8-6.8 2.8-2.7 0-5-1-6.8-2.8A9.2 9.2 0 01246 15c0-2.6 1-4.9 2.8-6.8a9 9 0 016.8-2.8z"
                  fillRule="evenodd"
                ></path>
              </g>
            </svg>
          </Link>
        </p>

        <Blockquote>
          <p>
            <em>
              Creative Commons Corporation ("Creative Commons") is not a law firm and does not provide legal services or
              legal advice. Distribution of Creative Commons public licenses does not create a lawyer-client or other
              relationship. Creative Commons makes its licenses and related information available on an "as-is" basis.
              Creative Commons gives no warranties regarding its licenses, any material licensed under their terms and
              conditions, or any related information. Creative Commons disclaims all liability for damages resulting
              from their use to the fullest extent possible.
            </em>
          </p>
        </Blockquote>

        <H3>Using Creative Commons Public Licenses</H3>

        <p>
          Creative Commons public licenses provide a standard set of terms and conditions that creators and other rights
          holders may use to share original works of authorship and other material subject to copyright and certain
          other rights specified in the public license below. The following considerations are for informational
          purposes only, are not exhaustive, and do not form part of our licenses.
        </p>
        <UnorderedList>
          <ListItem>
            <p>
              <strong>Considerations for licensors:</strong> Our public licenses are intended for use by those
              authorized to give the public permission to use material in ways otherwise restricted by copyright and
              certain other rights. Our licenses are irrevocable. Licensors should read and understand the terms and
              conditions of the license they choose before applying it. Licensors should also secure all rights
              necessary before applying our licenses so that the public can reuse the material as expected. Licensors
              should clearly mark any material not subject to the license. This includes other CC-licensed material, or
              material used under an exception or limitation to copyright.{" "}
              <Link href="https://wiki.creativecommons.org/Considerations_for_licensors_and_licensees#Considerations_for_licensors">
                More considerations for licensors
              </Link>
              .
            </p>
          </ListItem>
          <ListItem>
            <p>
              <strong>Considerations for the public:</strong> By using one of our public licenses, a licensor grants the
              public permission to use the licensed material under specified terms and conditions. If the licensor's
              permission is not necessary for any reason–for example, because of any applicable exception or limitation
              to copyright–then that use is not regulated by the license. Our licenses grant only permissions under
              copyright and certain other rights that a licensor has authority to grant. Use of the licensed material
              may still be restricted for other reasons, including because others have copyright or other rights in the
              material. A licensor may make special requests, such as asking that all changes be marked or described.
              Although not required by our licenses, you are encouraged to respect those requests where reasonable.{" "}
              <Link href="https://wiki.creativecommons.org/Considerations_for_licensors_and_licensees#Considerations_for_licensees">
                More considerations for the public
              </Link>
              .
            </p>
          </ListItem>
        </UnorderedList>

        <H3>Licensed Rights</H3>

        <p>
          By exercising the Licensed Rights (defined below), You accept and agree to be bound by the terms and
          conditions of this Creative Commons Attribution 4.0 International Public License ("Public License"). To the
          extent this Public License may be interpreted as a contract, You are granted the Licensed Rights in
          consideration of Your acceptance of these terms and conditions, and the Licensor grants You such rights in
          consideration of benefits the Licensor receives from making the Licensed Material available under these terms
          and conditions.
        </p>

        <H3>Section 1 – Definitions.</H3>

        <p>
          a. <strong>Adapted Material</strong> means material subject to Copyright and Similar Rights that is derived
          from or based upon the Licensed Material and in which the Licensed Material is translated, altered, arranged,
          transformed, or otherwise modified in a manner requiring permission under the Copyright and Similar Rights
          held by the Licensor. For purposes of this Public License, where the Licensed Material is a musical work,
          performance, or sound recording, Adapted Material is always produced where the Licensed Material is synched in
          timed relation with a moving image.
        </p>
        <p>
          b. <strong>Adapter's License</strong> means the license You apply to Your Copyright and Similar Rights in Your
          contributions to Adapted Material in accordance with the terms and conditions of this Public License.
        </p>
        <p>
          c. <strong>Copyright and Similar Rights</strong> means copyright and/or similar rights closely related to
          copyright including, without limitation, performance, broadcast, sound recording, and Sui Generis Database
          Rights, without regard to how the rights are labeled or categorized. For purposes of this Public License, the
          rights specified in Section 2(b)(1)-(2) are not Copyright and Similar Rights.
        </p>
        <p>
          d. <strong>Effective Technological Measures</strong> means those measures that, in the absence of proper
          authority, may not be circumvented under laws fulfilling obligations under Article 11 of the WIPO Copyright
          Treaty adopted on December 20, 1996, and/or similar international agreements.
        </p>
        <p>
          e. <strong>Exceptions and Limitations</strong> means fair use, fair dealing, and/or any other exception or
          limitation to Copyright and Similar Rights that applies to Your use of the Licensed Material.
        </p>
        <p>
          f. <strong>Licensed Material</strong> means the artistic or literary work, database, or other material to
          which the Licensor applied this Public License.
        </p>
        <p>
          g. <strong>Licensed Rights</strong> means the rights granted to You subject to the terms and conditions of
          this Public License, which are limited to all Copyright and Similar Rights that apply to Your use of the
          Licensed Material and that the Licensor has authority to license.
        </p>
        <p>
          h. <strong>Licensor</strong> means the individual(s) or entity(ies) granting rights under this Public License.
        </p>
        <p>
          i. <strong>Share</strong> means to provide material to the public by any means or process that requires
          permission under the Licensed Rights, such as reproduction, public display, public performance, distribution,
          dissemination, communication, or importation, and to make material available to the public including in ways
          that members of the public may access the material from a place and at a time individually chosen by them.
        </p>
        <p>
          j. <strong>Sui Generis Database Rights</strong> means rights other than copyright resulting from Directive
          96/9/EC of the European Parliament and of the Council of 11 March 1996 on the legal protection of databases,
          as amended and/or succeeded, as well as other essentially equivalent rights anywhere in the world.
        </p>
        <p>
          k. <strong>You</strong> means the individual or entity exercising the Licensed Rights under this Public
          License. <strong>Your</strong> has a corresponding meaning.
        </p>

        <H3>Section 2 – Scope.</H3>

        <p>
          a.{" "}
          <em>
            <strong>License grant.</strong>
          </em>
        </p>
        <OrderedList>
          <ListItem>
            <p>
              Subject to the terms and conditions of this Public License, the Licensor hereby grants You a worldwide,
              royalty-free, non-sublicensable, non-exclusive, irrevocable license to exercise the Licensed Rights in the
              Licensed Material to:
            </p>
            <p>A. reproduce and Share the Licensed Material, in whole or in part; and</p>
            <p>B. produce, reproduce, and Share Adapted Material.</p>
          </ListItem>
          <ListItem>
            <p>
              <strong>Exceptions and Limitations.</strong> For the avoidance of doubt, where Exceptions and Limitations
              apply to Your use, this Public License does not apply, and You do not need to comply with its terms and
              conditions.
            </p>
          </ListItem>
          <ListItem>
            <p>
              <strong>Term.</strong> The term of this Public License is specified in Section 6(a).
            </p>
          </ListItem>
          <ListItem>
            <p>
              <strong>Media and formats; technical modifications allowed.</strong> The Licensor authorizes You to
              exercise the Licensed Rights in all media and formats whether now known or hereafter created, and to make
              technical modifications necessary to do so. The Licensor waives and/or agrees not to assert any right or
              authority to forbid You from making technical modifications necessary to exercise the Licensed Rights,
              including technical modifications necessary to circumvent Effective Technological Measures. For purposes
              of this Public License, simply making modifications authorized by this Section 2(a)(4) never produces
              Adapted Material.
            </p>
          </ListItem>
          <ListItem>
            <p>
              <strong>Downstream recipients.</strong>
            </p>
            <p>
              A. <strong>Offer from the Licensor – Licensed Material.</strong> Every recipient of the Licensed Material
              automatically receives an offer from the Licensor to exercise the Licensed Rights under the terms and
              conditions of this Public License.
            </p>
            <p>
              B. <strong>No downstream restrictions.</strong> You may not offer or impose any additional or different
              terms or conditions on, or apply any Effective Technological Measures to, the Licensed Material if doing
              so restricts exercise of the Licensed Rights by any recipient of the Licensed Material.
            </p>
          </ListItem>
          <ListItem>
            <p>
              <strong>No endorsement.</strong> Nothing in this Public License constitutes or may be construed as
              permission to assert or imply that You are, or that Your use of the Licensed Material is, connected with,
              or sponsored, endorsed, or granted official status by, the Licensor or others designated to receive
              attribution as provided in Section 3(a)(1)(A)(i).
            </p>
          </ListItem>
        </OrderedList>
        <p>
          b.{" "}
          <em>
            <strong>Other rights.</strong>
          </em>
        </p>
        <OrderedList>
          <ListItem>
            <p>
              Moral rights, such as the right of integrity, are not licensed under this Public License, nor are
              publicity, privacy, and/or other similar personality rights; however, to the extent possible, the Licensor
              waives and/or agrees not to assert any such rights held by the Licensor to the limited extent necessary to
              allow You to exercise the Licensed Rights, but not otherwise.
            </p>
          </ListItem>
          <ListItem>
            <p>Patent and trademark rights are not licensed under this Public License.</p>
          </ListItem>
          <ListItem>
            <p>
              To the extent possible, the Licensor waives any right to collect royalties from You for the exercise of
              the Licensed Rights, whether directly or through a collecting society under any voluntary or waivable
              statutory or compulsory licensing scheme. In all other cases the Licensor expressly reserves any right to
              collect such royalties.
            </p>
          </ListItem>
        </OrderedList>

        <H3>Section 3 – License Conditions.</H3>

        <p>Your exercise of the Licensed Rights is expressly made subject to the following conditions.</p>
        <p>
          a.{" "}
          <em>
            <strong>Attribution.</strong>
          </em>
        </p>
        <OrderedList>
          <ListItem>
            <p>If You Share the Licensed Material (including in modified form), You must:</p>
            <p>A. retain the following if it is supplied by the Licensor with the Licensed Material:</p>
            <p>
              i. identification of the creator(s) of the Licensed Material and any others designated to receive
              attribution, in any reasonable manner requested by the Licensor (including by pseudonym if designated);
            </p>
            <p>ii. a copyright notice;</p>
            <p>iii. a notice that refers to this Public License;</p>
            <p>iv. a notice that refers to the disclaimer of warranties;</p>
            <p>v. a URI or hyperlink to the Licensed Material to the extent reasonably practicable;</p>
            <p>
              B. indicate if You modified the Licensed Material and retain an indication of any previous modifications;
              and
            </p>
            <p>
              C. indicate the Licensed Material is licensed under this Public License, and include the text of, or the
              URI or hyperlink to, this Public License.
            </p>
          </ListItem>
          <ListItem>
            <p>
              You may satisfy the conditions in Section 3(a)(1) in any reasonable manner based on the medium, means, and
              context in which You Share the Licensed Material. For example, it may be reasonable to satisfy the
              conditions by providing a URI or hyperlink to a resource that includes the required information.
            </p>
          </ListItem>
          <ListItem>
            <p>
              If requested by the Licensor, You must remove any of the information required by Section 3(a)(1)(A) to the
              extent reasonably practicable.
            </p>
          </ListItem>
          <ListItem>
            <p>
              If You Share Adapted Material You produce, the Adapter's License You apply must not prevent recipients of
              the Adapted Material from complying with this Public License.
            </p>
          </ListItem>
        </OrderedList>

        <H3>Section 4 – Sui Generis Database Rights.</H3>

        <p>
          Where the Licensed Rights include Sui Generis Database Rights that apply to Your use of the Licensed Material:
        </p>
        <p>
          a. for the avoidance of doubt, Section 2(a)(1) grants You the right to extract, reuse, reproduce, and Share
          all or a substantial portion of the contents of the database;
        </p>
        <p>
          b. if You include all or a substantial portion of the database contents in a database in which You have Sui
          Generis Database Rights, then the database in which You have Sui Generis Database Rights (but not its
          individual contents) is Adapted Material; and
        </p>
        <p>
          c. You must comply with the conditions in Section 3(a) if You Share all or a substantial portion of the
          contents of the database.
        </p>
        <p>
          For the avoidance of doubt, this Section 4 supplements and does not replace Your obligations under this Public
          License where the Licensed Rights include other Copyright and Similar Rights.
        </p>

        <H3>Section 5 – Disclaimer of Warranties and Limitation of Liability.</H3>

        <p>
          a.{" "}
          <strong>
            Unless otherwise separately undertaken by the Licensor, to the extent possible, the Licensor offers the
            Licensed Material as-is and as-available, and makes no representations or warranties of any kind concerning
            the Licensed Material, whether express, implied, statutory, or other. This includes, without limitation,
            warranties of title, merchantability, fitness for a particular purpose, non-infringement, absence of latent
            or other defects, accuracy, or the presence or absence of errors, whether or not known or discoverable.
            Where disclaimers of warranties are not allowed in full or in part, this disclaimer may not apply to You.
          </strong>
        </p>
        <p>
          b.{" "}
          <strong>
            To the extent possible, in no event will the Licensor be liable to You on any legal theory (including,
            without limitation, negligence) or otherwise for any direct, special, indirect, incidental, consequential,
            punitive, exemplary, or other losses, costs, expenses, or damages arising out of this Public License or use
            of the Licensed Material, even if the Licensor has been advised of the possibility of such losses, costs,
            expenses, or damages. Where a limitation of liability is not allowed in full or in part, this limitation may
            not apply to You.
          </strong>
        </p>
        <p>
          c. The disclaimer of warranties and limitation of liability provided above shall be interpreted in a manner
          that, to the extent possible, most closely approximates an absolute disclaimer and waiver of all liability.
        </p>

        <H3>Section 6 – Term and Termination.</H3>

        <p>
          a. This Public License applies for the term of the Copyright and Similar Rights licensed here. However, if You
          fail to comply with this Public License, then Your rights under this Public License terminate automatically.
        </p>
        <p>b. Where Your right to use the Licensed Material has terminated under Section 6(a), it reinstates:</p>
        <OrderedList>
          <ListItem>
            <p>
              automatically as of the date the violation is cured, provided it is cured within 30 days of Your discovery
              of the violation; or
            </p>
          </ListItem>
          <ListItem>
            <p>upon express reinstatement by the Licensor.</p>
          </ListItem>
        </OrderedList>
        <p>
          For the avoidance of doubt, this Section 6(b) does not affect any right the Licensor may have to seek remedies
          for Your violations of this Public License.
        </p>
        <p>
          c. For the avoidance of doubt, the Licensor may also offer the Licensed Material under separate terms or
          conditions or stop distributing the Licensed Material at any time; however, doing so will not terminate this
          Public License.
        </p>
        <p>d. Sections 1, 5, 6, 7, and 8 survive termination of this Public License.</p>

        <H3>Section 7 – Other Terms and Conditions.</H3>

        <p>
          a. The Licensor shall not be bound by any additional or different terms or conditions communicated by You
          unless expressly agreed.
        </p>
        <p>
          b. Any arrangements, understandings, or agreements regarding the Licensed Material not stated herein are
          separate from and independent of the terms and conditions of this Public License.
        </p>

        <H3>Section 8 – Interpretation.</H3>

        <p>
          a. For the avoidance of doubt, this Public License does not, and shall not be interpreted to, reduce, limit,
          restrict, or impose conditions on any use of the Licensed Material that could lawfully be made without
          permission under this Public License.
        </p>
        <p>
          b. To the extent possible, if any provision of this Public License is deemed unenforceable, it shall be
          automatically reformed to the minimum extent necessary to make it enforceable. If the provision cannot be
          reformed, it shall be severed from this Public License without affecting the enforceability of the remaining
          terms and conditions.
        </p>
        <p>
          c. No term or condition of this Public License will be waived and no failure to comply consented to unless
          expressly agreed to by the Licensor.
        </p>
        <p>
          d. Nothing in this Public License constitutes or may be interpreted as a limitation upon, or waiver of, any
          privileges and immunities that apply to the Licensor or You, including from the legal processes of any
          jurisdiction or authority.
        </p>

        <Blockquote>
          <p>
            Creative Commons is not a party to its public licenses. Notwithstanding, Creative Commons may elect to apply
            one of its public licenses to material it publishes and in those instances will be considered the
            "Licensor." The text of the Creative Commons public licenses is dedicated to the public domain under the{" "}
            <Link href="https://creativecommons.org/publicdomain/zero/1.0/legalcode">
              <em>CC0 Public Domain Dedication</em>
            </Link>
            . Except for the limited purpose of indicating that material is shared under a Creative Commons public
            license or as otherwise permitted by the Creative Commons policies published at{" "}
            <Link href="https://creativecommons.org/policies">creativecommons.org/policies</Link>, Creative Commons does
            not authorize the use of the trademark "Creative Commons" or any other trademark or logo of Creative Commons
            without its prior written consent including, without limitation, in connection with any unauthorized
            modifications to any of its public licenses or any other arrangements, understandings, or agreements
            concerning use of licensed material. For the avoidance of doubt, this paragraph does not form part of the
            public licenses.
          </p>
          <p>
            Creative Commons may be contacted at <Link href="https://creativecommons.org/">creativecommons.org</Link>.
          </p>
        </Blockquote>
      </Content>
    </>
  );
};

export default License;
